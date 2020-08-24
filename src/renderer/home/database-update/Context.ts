import { createContext } from "react";
import { DatabaseUpdate } from "./types";
import { NotificationWithMessage } from "../types";

interface C {
  databaseUpdate: DatabaseUpdate;
  updateContests: () => void;
  updateProblems: () => void;
  updateProblemModels: () => void;
  updateUserSubmissions: () => void;
  updateAll: () => void;
  notification: NotificationWithMessage;
  closeNotification: () => void;
}

const init: DatabaseUpdate = {
  contests: { lastUpdate: null, progress: "STANDS_BY" },
  problems: { lastUpdate: null, progress: "STANDS_BY" },
  problemModels: { lastUpdate: null, progress: "STANDS_BY" },
  userSubmissions: { lastUpdate: null, progress: "STANDS_BY" },
};

export const Context = createContext<C>({
  databaseUpdate: init,
  updateContests: () => {
    return;
  },
  updateProblems: () => {
    return;
  },
  updateProblemModels: () => {
    return;
  },
  updateUserSubmissions: () => {
    return;
  },
  updateAll: () => {
    return;
  },
  notification: {
    open: false,
    status: "success",
    message: "",
  },
  closeNotification: () => {
    return;
  },
});
