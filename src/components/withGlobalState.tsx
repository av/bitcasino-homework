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

/**
 * Global state context value. This object
 * is returned from the useGlobalState hook.
 */
export type GlobalStateContextValue<S extends State, A extends Action> = {
  /**
   * Represents the current global state
   */
  state: S;

  /**
   * A dispatcher set up to accept
   * actions as per given constructed state.
   */
  dispatch: Dispatch<A | AsyncableDispatch<A>>;
};

/**
 * A function which returns the global state
 * instance when called.
 * Used for programmatic initialisation of a state.
 */
export type GlobalStateProvider<S extends State> = () => S;

const GlobalStateContext = createContext<
  GlobalStateContextValue<State, Action>
>(null);

/**
 * A convenience helper, typing the interactions
 * with a global state context.
 */
export function useGlobalState<S extends State, A extends Action>() {
  return useContext(GlobalStateContext) as GlobalStateContextValue<S, A>;
}

/**
 * A HOC which instantiates the global state,
 * sets up the provider for it and configures the
 * asyncable reducer to dispatch actions.
 *
 * @param Page - Next.js Page component
 * @param stateProvider - initialiser for an empty state
 * @param reducer - reducer for the given state config
 */
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
