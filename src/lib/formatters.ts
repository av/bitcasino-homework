import { Ticker, Market } from "queries/markets";

/**
 * For a given market ticker,
 * returns its price. Hardcoded to EUR, but
 * could employ some more complicated logic as well.
 *
 * @param ticker - a single ticker value from a certain market
 */
export function tickerPrice(ticker?: Ticker) {
  if (ticker) {
    return `${parseFloat(ticker.lastPrice).toFixed(2)} €`;
  } else {
    return "Unknown";
  }
}

/**
 * For a given market document, extracts
 * the name of exchange from its market symbol.
 *
 * @param market - a single market document
 */
export function marketExchange(market?: Market) {
  if (market && market.marketSymbol) {
    return market.marketSymbol.split(":")[0];
  } else {
    return "Unknown";
  }
}
