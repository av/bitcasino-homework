import gql from "graphql-tag";

/**
 * Represents a single ticker value
 * for a certain market
 */
export interface Ticker {
  lastPrice: string;
}

/**
 * Represents a market for a certain
 * base/quote symbols.
 */
export interface Market {
  id: string;
  marketSymbol: string;
  baseSymbol: string;
  ticker?: Ticker;
}

/**
 * Represents a response from the Markets API
 */
export interface MarketsData {
  markets: Market[];
}

/**
 * Allows to fetch markets with ids matchin
 * the given input.
 */
export const fetchMarkets = gql`
  query FetchMarkets($ids: [String]!) {
    markets(filter: { id: { _in: $ids } }) {
      id
      marketSymbol
      baseSymbol
      ticker {
        lastPrice
      }
    }
  }
`;

/**
 * For a given prefix, attempts to find a
 * market with base symbol starting with it.
 */
export const marketsLookup = gql`
  query MarketsLookup($prefix: String!) {
    markets(
      filter: { baseSymbol: { _like: $prefix }, quoteSymbol: { _eq: "EUR" } }
    ) {
      id
      marketSymbol
      baseSymbol
      ticker {
        lastPrice
      }
    }
  }
`;
