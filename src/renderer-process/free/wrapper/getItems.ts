import { ipcRenderer } from "electron";
import { GET_ALL_ITEMS } from "../../../main-process/database/free-queue/getAllItems";

export const getItems = (): void => {
  return ipcRenderer.send(GET_ALL_ITEMS);
};
