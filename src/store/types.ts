/**
 * Represents the base abstract state object,
 * other State objects should extend from it to
 * ensure the type compatibility of components
 * working with the abstract state.
 */
export type State = object;

/**
 * Represents the base abstract action.
 * The other actions should extends from it
 * to ensure type compatibility where needed.
 */
export type Action = {
  type: string;
};
