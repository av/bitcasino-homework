import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

export function createApolloClient(initialState, ctx) {
  let httpLink;
  const uri = process.env.NEXT_PUBLIC_BLOCKTAP_URL;
  const headers = {};

  httpLink = new HttpLink({
    uri,
    headers,
  });

  return new ApolloClient({
    ssrMode: true,
    link: httpLink,
    cache: new InMemoryCache().restore(initialState),
  });
}
