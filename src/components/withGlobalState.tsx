import {
  createContext,
  useReducer,
  useCallback,
  useContext,
  Reducer,
  Dispatch,
} from "react";
import { asyncable, AsyncableDispatch } from "lib/utils";
import { State, Action } from "store/types";

export type GlobalStateContextValue<S extends State, A extends Action> = {
  state: S;
  dispatch: Dispatch<A | AsyncableDispatch<A>>;
};

export type GlobalStateProvider<S extends State> = {
  (): S;
};

const GlobalStateContext = createContext<
  GlobalStateContextValue<State, Action>
>(null);

export function useGlobalState<S extends State, A extends Action>() {
  return useContext(GlobalStateContext) as GlobalStateContextValue<S, A>;
}

export default function withGlobalState<S extends State, A extends Action>(
  Page,
  stateProvider: GlobalStateProvider<S>,
  reducer: Reducer<S, A>
) {
  const initialState = stateProvider();

  function PageWithGlobalState(props) {
    const [state, dispatchBase] = useReducer<Reducer<S, A>>(
      reducer,
      initialState
    );
    const dispatch = useCallback(asyncable(state, dispatchBase), []);

    return (
      <GlobalStateContext.Provider value={{ state, dispatch }}>
        <Page {...props} />
      </GlobalStateContext.Provider>
    );
  }

  return PageWithGlobalState;
}
