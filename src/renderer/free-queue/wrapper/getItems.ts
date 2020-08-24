import { ipcRenderer } from "electron";
import { GET_ALL_ITEMS } from "../../../main/database/free-queue/getAllItems";

export const getItems = (): void => {
  return ipcRenderer.send(GET_ALL_ITEMS);
};
