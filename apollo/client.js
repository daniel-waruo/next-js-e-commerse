import ApolloLinkTimeout from 'apollo-link-timeout';
import {ApolloClient} from 'apollo-client'
import {onError} from "apollo-link-error";
import {BatchHttpLink} from "apollo-link-batch-http";
import {ApolloLink, concat, split} from 'apollo-link';

import fetch from 'isomorphic-unfetch';

import nextCookie from 'next-cookies'
import cookie from 'js-cookie';

import resolvers from "./resolvers";
import types from "./types"
import {GRAPHQL_ENDPOINT} from "../_constants";
import {initCache} from './lib/init-cache'


export default function createApolloClient(initialState, ctx) {
  // batch Http Link object
  let batchHttpLink = new BatchHttpLink({
    uri: GRAPHQL_ENDPOINT, // set graphql endpoint
    credentials: 'include',// set credentials like include
    connectToDevTools: process.env.NODE_ENV !== 'production', // if in development connect to Dev tools
    queryDeduplication: true, // set query deduplication to true
    fetch
  });

  // create an authentication middleware
  const authMiddleware = new ApolloLink((operation, forward) => {
    // get the authorization token from cookies
    let token = cookie.get('token');
    // get the anonymous session key from cookies
    let anonymous_session = cookie.get('anonymous_session');

    // if in server environment
    if (Boolean(ctx)) {
      // get token from cookie in request
      token = nextCookie(ctx).token;
      // get anonymous from cookie in request
      anonymous_session = nextCookie(ctx).anonymous_session;
    }
    // set request headers
    operation.setContext(({headers = {}}) => ({
      headers: {
        ...headers,
        authorization: token ? `Token ${token}` : "",
        'anonymous-session': anonymous_session
      }
    }));
    return forward(operation);
  });

  const session = new ApolloLink((operation, forward) => {
    return forward(operation).map(
      response => {
        // get context
        const context = operation.getContext();
        // get server response headers
        const {response: {headers}} = context;
        if (headers) {
          if (Boolean(ctx)) {
            // dynamically import cookie parser and cookieSet
            const cookieParser = require('set-cookie-parser');
            const cookieSet = require('cookies-next').setCookies;

            // get cookie string from header
            const cookieString = headers.get("set-cookie");
            // split cookie headers
            const splitCookieHeaders = cookieParser.splitCookiesString(cookieString);
            // parse cookies from server  set-cookie header
            const cookies = cookieParser.parse(
              splitCookieHeaders,
              {
                decodeValues: true,  // default: true
                map: true           //default: false
              }
            );
            // check if anonymous session in cookies
            if (cookies.anonymous_session) {
              // get anonymous session from server set-cookie header
              const {anonymous_session: {name, value, expires}} = cookies;
              // set anonymous_session on client site cookies
              cookieSet(ctx, name, value, {expires: expires});
            }
          }
        }
        return response;
      });
  });

  // initialize error Link to handle Errors
  const errorLink = onError(({networkError}) => {
    if (Boolean(ctx)) {
      if (networkError.statusCode === 408)
        console.log("taken too long to respond")
    }
  });

  // if in server environment
  if (Boolean(ctx)) {
    // set the timeOut link
    const timeoutLink = new ApolloLinkTimeout(5000); // 5 second timeout
    // combine the batchHttpLink with the concat
    batchHttpLink = errorLink.concat(timeoutLink.concat(batchHttpLink));
    console.info("batch link sent to the server");
  }

  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    cache: initCache(initialState),
    shouldBatch: true,
    link: concat(
      authMiddleware.concat(session),
      batchHttpLink
    ),
    typeDefs: types,
    resolvers
  });
}
