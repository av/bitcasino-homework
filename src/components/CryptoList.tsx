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

export default function CryptoList(props) {
  const { state, dispatch } = useGlobalState<
    CryptoTrackerState,
    CryptoTrackerAction
  >();
  const hasStoredItems = state.items.length !== 0;
  const { loading, data, error } = useQuery<MarketsData>(fetchMarkets, {
    skip: !hasStoredItems,
    variables: {
      ids: state.items,
    },
  });

  useEffect(() => {
    serialize(storageKey, state);
  }, [state.items]);

  console.log(loading, data, error, hasStoredItems);

  return (
    <>
      <LoadingContent
        isLoading={!data}
        loading={() => <span>Loading</span>}
        content={() => (
          <>
            <ul {...props}>
              {data && data.markets.map((item) => {
                return <CryptoItem key={item.id} item={item} />;
              })}
            </ul>
          </>
        )}
      />
      <Button
        onClick={() =>
          dispatch({
            type: CryptoTrackerActionTypes.ADD,
            item: "binance_eth_eur",
          })
        }
      >
        Add Crypto
      </Button>
      <Button
        onClick={() =>
          dispatch({
            type: CryptoTrackerActionTypes.REMOVE,
            item: "binance_eth_eur",
          })
        }
      >
        Remove Crypto
      </Button>
    </>
  );
}
