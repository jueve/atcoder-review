import { FQItem } from "../wrapper/types";
import { ipcRenderer } from "electron";
import { DELETE_ITEMS } from "../../../main-process/database/free-queue/deleteItems";
import { List } from "immutable";

export const deleteItems = (fqis: List<FQItem>): void => {
  ipcRenderer.send(DELETE_ITEMS, fqis.toArray());
};
