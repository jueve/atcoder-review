import { ipcRenderer } from "electron";
import { GET_SINGLE_ITEM } from "../../../main/database/free-queue/getSingleItem";

export const getItem = (id: string): void => {
  ipcRenderer.send(GET_SINGLE_ITEM, id);
};
