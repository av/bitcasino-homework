import CryptoIpsum from "./CryptoIpsum";
import CryptoItem from "./CryptoItem";
import { useQuery } from "@apollo/react-hooks";
import { marketsLookup, MarketsData, fetchMarkets } from "queries/markets";
import { useGlobalState } from "./withGlobalState";
import {
  CryptoTrackerState,
  CryptoTrackerAction,
  CryptoTrackerActionTypes,
  storageKey,
} from "store/cryptoTracker";
import Button from "./Button";
import { useEffect } from "react";
import { serialize } from "lib/utils";
import LoadingContent from "./LoadingContent";
import AnimatedList from "./AnimatedList";

/**
 * A list of all tracked crypto assets, 
 * gets the items from the global store
 * and queries the blocktap API for latest prices.
 * 
 * Polls data each 5s.
 */
export default function CryptoList(props) {
  const { state, dispatch } = useGlobalState<
    CryptoTrackerState,
    CryptoTrackerAction
  >();
  const hasStoredItems = state.items.length !== 0;
  const { loading, data = { markets: [] }, error } = useQuery<MarketsData>(
    fetchMarkets,
    {
      skip: !hasStoredItems,
      variables: {
        ids: state.items,
      },
      pollInterval: 5000,
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    serialize(storageKey, state);
  }, [state.items]);

  return (
    <div {...props} data-e2e-crypto-list>
      <AnimatedList getKey={(item) => item.id}>
        {data.markets.map((item) => {
          return <CryptoItem key={item.id} item={item} />;
        })}
      </AnimatedList>
    </div>
  );
}
