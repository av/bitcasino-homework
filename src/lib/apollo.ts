import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { isServer } from "./utils";

/**
 * Instantiates the apollo client.
 * 
 * @param initialState - used to rehydrade the client after SSR
 */
export function createApolloClient(initialState) {
  let httpLink;
  const uri = process.env.NEXT_PUBLIC_BLOCKTAP_URL;
  const headers = {};

  httpLink = new HttpLink({
    uri,
    headers,
  });

  return new ApolloClient({
    ssrMode: isServer(),
    link: httpLink,
    cache: new InMemoryCache().restore(initialState),
  });
}
