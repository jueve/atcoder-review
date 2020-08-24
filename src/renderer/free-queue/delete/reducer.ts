import { List } from "immutable";
import { FQItem } from "../wrapper/types";
import { ActionOnDeleteManipulation } from "./types";

/**
 * Manage state of items which you want to delete from the database.
 *
 * @param {List<FQItem>} state - `FQItem`s to delete.
 * @param {ActionOnDeleteManipulation} action - Contains the kind of action and previous state.
 * @returns {List<FQItem>} - Returns new state.
 */
export const reducer = (
  state: List<FQItem>,
  action: ActionOnDeleteManipulation
): List<FQItem> => {
  const idx: number = state.indexOf(action.item);
  switch (action.type) {
    case "ADD":
      return state.push(action.item);
    case "REMOVE":
      return state.delete(idx);
    case "CLEAR":
      return List<FQItem>();
    default:
      return List<FQItem>();
  }
};
