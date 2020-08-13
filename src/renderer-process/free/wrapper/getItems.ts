import { ipcRenderer } from "electron";
import { FQItem } from "../wrapper/types";
import { GET_ALL_ITEMS } from "../../../main-process/database/free-queue/getAllItems";

export const getItems = (): Array<FQItem> => {
  return ipcRenderer.sendSync(GET_ALL_ITEMS);
};
