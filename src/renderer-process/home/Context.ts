import React, { createContext } from "react";
import { FetchStatus, Notification } from "./types";

interface C {
  contests: FetchStatus;
  problems: FetchStatus;
  problemModels: FetchStatus;
  userSubmissions: FetchStatus;
  updateContests: () => void;
  updateProblems: () => void;
  updateProblemModels: () => void;
  updateUserSubmissions: () => void;
  notification: Notification;
}

const init: FetchStatus = {
  lastUpdate: "",
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
  notification: {
    open: false,
    status: "success",
    message: "",
  },
});
