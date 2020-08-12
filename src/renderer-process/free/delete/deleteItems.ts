import { FQItem } from "../wrapper/types";
import { ipcRenderer } from "electron";
import { FreeQueue as FQChannel } from "../../../main-process/database/channel-name";
import { List } from "immutable";

export const deleteItems = (fqis: List<FQItem>): void => {
  ipcRenderer.send(FQChannel.DELETE_ITEMS, fqis.toArray());
};
