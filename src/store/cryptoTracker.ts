import { State, Action } from "./types";

export interface CryptoTrackerState extends State {
  items: string[];
}

export enum CryptoTrackerActionTypes {
  ADD = "ADD",
  REMOVE = "REMOVE",
}

export interface AddItemAction extends Action {
  type: CryptoTrackerActionTypes.ADD;
  item: string;
}

export interface RemoveItemAction extends Action {
  type: CryptoTrackerActionTypes.REMOVE;
  item: string;
}

export type CryptoTrackerAction = AddItemAction | RemoveItemAction;

export const storageKey = 'state:cryptoTracker';

export const initialState: CryptoTrackerState = {
  items: [],
};

export function reducer(
  state: CryptoTrackerState,
  action: CryptoTrackerAction
): CryptoTrackerState {
  switch (action.type) {
    case CryptoTrackerActionTypes.ADD:
      return {
        ...state,
        items: [...state.items, action.item],
      };
    case CryptoTrackerActionTypes.REMOVE:
      return {
        ...state,
        items: state.items.filter((item) => item !== action.item),
      };
    default:
      return state;
  }
}
