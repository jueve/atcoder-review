import { createContext } from "react";
import { NotificationWithMessage } from "../types";
import { UserId } from "./types";

interface C {
  userId: UserId;
  inputUserId: (_arg0: UserId) => void;
  updateUserId: () => void;
  notification: NotificationWithMessage;
  closeNotification: () => void;
}

export const Context = createContext<C>({
  userId: null,
  inputUserId: (_arg0: UserId) => {
    return;
  },
  updateUserId: () => {
    return;
  },
  notification: {
    open: false,
    status: "info",
    message: "",
  },
  closeNotification: () => {
    return;
  },
});
