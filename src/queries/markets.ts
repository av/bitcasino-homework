import gql from "graphql-tag";

export interface Ticker {
  lastPrice: string;
}

export interface Market {
  id: string;
  marketSymbol: string;
  baseSymbol: string;
  ticker?: Ticker;
}

export interface MarketsData {
  markets: Market[];
}

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
