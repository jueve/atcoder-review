import { FQItem } from "../wrapper/types";
import { ipcRenderer } from "electron";
import { GET_SINGLE_ITEM } from "../../../main-process/database/free-queue/getSingleItem";

export const getItem = (id: string): null | FQItem => {
  const items = ipcRenderer.sendSync(GET_SINGLE_ITEM, id);
  if (items === []) {
    return null;
  } else {
    return items[0];
  }
};
