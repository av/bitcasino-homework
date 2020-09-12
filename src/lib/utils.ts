import { State, Action } from "store/types";
import { Dispatch } from "react";

export function classed(...classNames: Array<string | undefined>) {
  return classNames.filter((cls) => cls).join(" ");
}

export type AsyncableDispatch<A extends Action> = {
  (dispatch: Dispatch<A>, state: State): void;
};

export function asyncable<S extends State, A extends Action>(
  state: S,
  dispatch: Dispatch<A>
) {
  return (action: A | AsyncableDispatch<A>) =>
    typeof action === "function" ? action(dispatch, state) : dispatch(action);
}

export function serialize<T>(item: string, data: T) {
  const storable = JSON.stringify(data);
  localStorage.setItem(item, storable);
}

export function deserialize<T>(item: string, defaultValue: T): T {
  if (isServer()) {
    return defaultValue;
  }

  const storedState = localStorage.getItem(item);

  if (storedState === null) {
    return defaultValue;
  }

  return JSON.parse(storedState);
}

export function isServer() {
  return typeof window === "undefined";
}

export function isBrowser() {
  return !isServer();
}
