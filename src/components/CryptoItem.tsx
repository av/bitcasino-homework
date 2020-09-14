import Button from "./Button";
import { Market } from "queries/markets";
import * as formatters from "lib/formatters";
import { useGlobalState } from "./withGlobalState";
import {
  CryptoTrackerState,
  CryptoTrackerAction,
  CryptoTrackerActionTypes,
} from "store/cryptoTracker";
import { useCallback } from "react";

export type CryptoItemProps = { item: Market };

/**
 * A single item for a crypto tracker
 * Shows the tracked symbol, exchange
 * and the last ticker price.
 */
export default function CryptoItem({ item }: CryptoItemProps) {
  const { dispatch } = useGlobalState<
    CryptoTrackerState,
    CryptoTrackerAction
  >();

  const removeItem = useCallback(() => {
    dispatch({
      type: CryptoTrackerActionTypes.REMOVE,
      item: item.id,
    });
  }, [item]);

  return (
    <div className="crypto-item flex flex-row items-center p-2" data-e2e-crypto-item>
      <img src="/images/icon.svg" />
      <div className="ml-8 crypto-info">
        <h3 className="font-bold text-lg">
          <span>{item.baseSymbol} </span>
          <span className="font-normal text-white text-opacity-25">
            {formatters.marketExchange(item)}
          </span>
        </h3>
        <h5 className="text-sm text-white text-opacity-50">
          <span>{formatters.tickerPrice(item.ticker)}</span>
        </h5>
      </div>

      <Button
        variant="icon"
        className="ml-auto text-white text-opacity-50"
        onClick={removeItem}
      >
        ✕
      </Button>

      <style jsx>{`
        .crypto-item {
          border-bottom: 2px solid;
          border-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.3),
              transparent
            )
            100% 1;
        }
      `}</style>
    </div>
  );
}
