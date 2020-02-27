import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {HttpLink} from 'apollo-link-http'
import {resolvers, typeDefs} from "./apollo";
import {GRAPHQL_ENDPOINT} from "./_constants";
import {ApolloLink, concat} from 'apollo-link';
import fetch from 'isomorphic-unfetch';

global.fetch = fetch;

// initialize cache object
const cache = new InMemoryCache();

const httpLink = new HttpLink({
  ssr: true,
  uri: GRAPHQL_ENDPOINT,
  credentials: 'include',
  connectToDevTools: false,
  queryDeduplication: true,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  let token;
  if (typeof localStorage != "undefined")
    token = localStorage.getItem('token') || null;

  operation.setContext(({headers = {}}) => ({
    headers: {
      ...headers,
      authorization: token ? `Token ${token}` : "",
    }
  }));

  return forward(operation);
});


// set application initial state
cache.writeData({
  data: {
    addCartVisible: false,
    addCartProductID: null,
    loginErrors: null,
    registerErrors: null
  }
});

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    cache: cache,
    link: concat(
      authMiddleware,
      httpLink,
    ),
    typeDefs, resolvers
  });
}
