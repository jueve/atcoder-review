import { ActionOfButtonDisable, ButtonDisable } from "./types";

export const menuBarReducer = (
  state: ButtonDisable,
  action: ActionOfButtonDisable
): ButtonDisable => {
  const base: ButtonDisable = {
    home: false,
    freeQueue: false,
    dateQueue: false,
    tagQueue: false,
  };

  switch (action.page) {
    case "HOME":
      return { ...base, home: true };
    case "FREE_QUEUE":
      return { ...base, freeQueue: true };
    case "DATE_QUEUE":
      return { ...base, dateQueue: true };
    case "TAG_QUEUE":
      return { ...base, tagQueue: true };
    default:
      return base;
  }
};
