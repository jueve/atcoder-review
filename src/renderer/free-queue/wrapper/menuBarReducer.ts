import { ButtonDisable, ActionOfButtonDisable } from "./types";

export const menuBarReducer = (
  state: ButtonDisable,
  action: ActionOfButtonDisable
): ButtonDisable => {
  const base: ButtonDisable = {
    insert: false,
    delete: false,
  };
  switch (action.page) {
    case "INSERT":
      return { ...base, insert: true };
    case "DELETE":
      return { ...base, delete: true };
    default:
      return base;
  }
};
