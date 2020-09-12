import { Ticker } from "queries/markets";

export function tickerPrice(ticker: Ticker | undefined) {
  if (ticker) {
    return parseFloat(ticker.lastPrice).toFixed(2);
  } else {
    return "Unknown";
  }
}
