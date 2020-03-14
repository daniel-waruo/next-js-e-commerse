import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {resolvers, typeDefs} from "../apollo/index";
import {GRAPHQL_ENDPOINT} from "../_constants";
import {ApolloLink, concat, split} from 'apollo-link';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies'
import {initCache} from './init-cache'
import cookie from 'js-cookie';

global.fetch = fetch;


export default function createApolloClient(initialState, ctx) {
  // initialize cache object
  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    credentials: 'include',
    connectToDevTools: process.env.NODE_ENV !== 'production',
    queryDeduplication: true,
  });
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers from token
    let token = cookie.get('token'),
      anonymous_session = cookie.get('anonymous_session');

    if (Boolean(ctx)) {
      // get token from cookie
      token = nextCookie(ctx).token;
      anonymous_session = nextCookie(ctx).anonymous_session;
    }

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
            const setCookie = require('set-cookie-parser');
            const cookieSet = require('cookies-next').setCookies;

            // get cookie string from header
            const cookieString = headers.get("set-cookie");
            // split cookie headers
            const splitCookieHeaders = setCookie.splitCookiesString(cookieString);
            // parse cookies from server  set-cookie header
            const cookies = setCookie.parse(
              splitCookieHeaders,
              {
                decodeValues: true,  // default: true
                map: true           //default: false
              }
            );
            // get anonymous session from server set-cookie header
            const {anonymous_session: {name, value, expires}} = cookies;
            // set anonymous_session on client site cookies
            cookieSet(ctx, name, value, {expires: expires});
          }
        }
        return response;
      });
  });
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    cache: initCache(initialState),
    link: concat(
      authMiddleware.concat(session),
      httpLink
    ),
    typeDefs,
    resolvers
  });
}
