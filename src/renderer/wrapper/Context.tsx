import { createContext } from "react";
import { Initialization } from "./types";

interface C {
  initialization: Initialization;
}

export const Context = createContext<C>({
  initialization: {
    baseDirectory: {
      status: "STANDS_BY",
      message: "",
    },
    configFile: {
      status: "STANDS_BY",
      message: "",
    },
    logFile: {
      status: "STANDS_BY",
      message: "",
    },
    databaseUpdateLogFile: {
      status: "STANDS_BY",
      message: "",
    },
    databaseTables: {
      status: "STANDS_BY",
      message: "",
    },
  },
});
