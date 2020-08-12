import { FQItem } from "../wrapper/types";

type ActionType = "ADD" | "REMOVE" | "CLEAR";

export interface ActionOnDeleteManipulation {
  type: ActionType;
  item: FQItem;
}
