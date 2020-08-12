import React, { createContext } from "react";
import { FQItem, FQCandidate } from "./types";

interface C {
  items: Array<FQItem>;
  toShow: Array<FQItem>;
  itemsPerPage: number;
  page: number;
  pageLength: number;
  notification: { status: string; open: boolean; message: string };
  changeToShow: (_arg0: number, _arg1: number, _arg2: Array<FQItem>) => void;
  resetPage: () => void;
  closeNotification: () => void;
}

export const Context = createContext<C>({
  items: Array<FQItem>(0),
  toShow: Array<FQItem>(0),
  itemsPerPage: 5,
  page: 1,
  pageLength: 1,
  notification: { status: "warning", open: false, message: "" },
  changeToShow: (_arg0: number, _arg1: number, _arg2: Array<FQItem>) => {
    return;
  },
  resetPage: () => {
    return;
  },
  closeNotification: () => {
    return;
  },
});
