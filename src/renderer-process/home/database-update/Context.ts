import { createContext } from "react";
import { FetchStatus } from "./types";
import { NotificationWithMessage } from "../types";

interface C {
  contests: FetchStatus;
  problems: FetchStatus;
  problemModels: FetchStatus;
  userSubmissions: FetchStatus;
  updateContests: () => void;
  updateProblems: () => void;
  updateProblemModels: () => void;
  updateUserSubmissions: () => void;
  updateAll: () => void;
  notification: NotificationWithMessage;
  closeNotification: () => void;
}

const init: FetchStatus = {
  lastUpdate: 0,
  progress: "STANDS_BY",
};

export const Context = createContext<C>({
  contests: init,
  problems: init,
  problemModels: init,
  userSubmissions: init,
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
