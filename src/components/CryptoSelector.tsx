import { useForm, Controller } from "react-hook-form";
import Button from "./Button";
import { useGlobalState } from "./withGlobalState";
import {
  CryptoTrackerActionTypes,
  CryptoTrackerState,
  CryptoTrackerAction,
} from "store/cryptoTracker";
import { useApolloClient } from "@apollo/react-hooks";
import { useCallback } from "react";
import * as marketQueries from "queries/markets";
import * as formatters from "lib/formatters";
import { Typeahead } from "./Typeahead";

/**
 * Data for the selector form
 */
type CryptoSelectorForm = {
  code: string;
};

/**
 * Implements basic form allowing
 * selection of a crypto symbol from a certain market
 * and then storing the selection in the global state.
 */
export default function CryptoSelector() {
  const apollo = useApolloClient();
  const { state, dispatch } = useGlobalState<
    CryptoTrackerState,
    CryptoTrackerAction
  >();
  const { handleSubmit, control, reset } = useForm<CryptoSelectorForm>({
    defaultValues: {
      code: "",
    },
  });

  // Handles form submit by dispatchin
  // the selected item to the state and resetting the form
  const onSubmit = (data: CryptoSelectorForm) => {
    dispatch({
      type: CryptoTrackerActionTypes.ADD,
      item: data.code,
    });
    reset();
  };

  // Obtains suggestions data for the given query
  const getData = useCallback(
    (query: string) => {
      return apollo
        .query<marketQueries.MarketsData>({
          query: marketQueries.marketsLookup,
          fetchPolicy: "no-cache",
          variables: {
            prefix: `${query}%`,
          },
        })
        .then(({ data }) => data.markets)
        .then((markets) => {
          // Do not suggest what's been already added
          return markets.filter((market) => !state.items.includes(market.id));
        });
    },
    [state.items]
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="code"
          render={({ onChange, onBlur, value, name }) => {
            return (
              <Typeahead<marketQueries.Market>
                getData={getData}
                onChange={onChange}
                name={name}
                label="Cryptocurrency Code"
                getItemValue={(item) => item.id}
                getItemName={(item) => item.baseSymbol}
                className="mb-2"
                value={value}
                item={(item) => (
                  <div
                    className="crypto-suggestion px-4 py-1 rounded"
                    data-e2e-crypto-suggestion
                  >
                    <h3 className="">{item.marketSymbol}</h3>
                    <h5 className="text-sm text-gray-600">
                      {formatters.tickerPrice(item.ticker)}
                    </h5>
                  </div>
                )}
              />
            );
          }}
        />
        <Button type="submit" className="w-full">
          <span>Add</span>
        </Button>
      </form>
      <style jsx>{`
        form :global(.crypto-suggestion:hover) {
          cursor: pointer;
          background: rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </>
  );
}
