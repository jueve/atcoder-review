import React, { createContext } from "react";
import { List } from "immutable";
import { FQItem } from "../wrapper/types";

interface C {
  toDelete: List<FQItem>;
  changeToDelete: (
    _arg0: null | React.ChangeEvent<HTMLInputElement>,
    _arg1?: undefined | FQItem
  ) => void;
}

export const Context = createContext<C>({
  toDelete: List<FQItem>(),
  changeToDelete: (
    _arg0: null | React.ChangeEvent<HTMLInputElement>,
    _arg1?: undefined | FQItem
  ) => {
    return;
  },
});
