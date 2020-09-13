import { State, Action } from "store/types";
import { Dispatch } from "react";
import { time } from "console";

/**
 * A convenience helper,
 * combining given set of class names together.
 * Input array could contain holes, which will be filtered.
 *
 * @param classNames - A supposed array of class names to combine.
 */
export function classed(...classNames: Array<string | undefined>) {
  return classNames.filter((cls) => cls).join(" ");
}

/**
 * A version of dispach which may perform
 * some actions in future, depending on its internal logic.
 */
export type AsyncableDispatch<A extends Action> = (
  dispatch: Dispatch<A>,
  state: State
) => void;

/**
 * A wrapper over basic dispatch, allowing to
 * accept asyncable actions, which could run additional
 * internal logic and dispatch other actions internally.
 *
 * @param state - State to work with, used for asyncable actions
 * @param dispatch - a base dispatch
 */
export function asyncable<S extends State, A extends Action>(
  state: S,
  dispatch: Dispatch<A>
) {
  return (action: A | AsyncableDispatch<A>) =>
    typeof action === "function" ? action(dispatch, state) : dispatch(action);
}

/**
 * Attempts to serialise a given data document to a local storage.
 * Will throw if the data is not serialisable.
 *
 * @param item - key to use for storing the data
 * @param data - data document to store
 */
export function serialize<T>(item: string, data: T) {
  const storable = JSON.stringify(data);
  localStorage.setItem(item, storable);
}

/**
 * Attempts to obtain an item from a local storage.
 * Will throw if stored data is in a format not compatible with JSON.
 *
 * @param item - key to use to restore the data
 * @param defaultValue - default value, in case data has never been set
 */
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

/**
 * Returns true if given code runs on server.
 */
export function isServer() {
  return typeof window === "undefined";
}

/**
 * Returns true if current code is running
 * within a browser.
 */
export function isBrowser() {
  return !isServer();
}

/**
 * Debounces given function so that
 * it's invoked when certain timeout passes
 * since the last call attempt.
 *
 * @param fn - function to debounce
 * @param timeout - delay in milliseconds
 */
export function debounce<Params extends any[]>(
  fn: (...args: Params) => void,
  timeout?: number
) {
  let timer: NodeJS.Timeout;

  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, timeout);
  };
}

/**
 * Returns a given value, whatever it is.
 *
 * @param value - value to return.
 */
export function identity(value: any) {
  return value;
}

/**
 * A function which is guaranteed to
 * do nothing when called, whatever arguments passed.
 */
export function noop() {
  // Does nothing.
}