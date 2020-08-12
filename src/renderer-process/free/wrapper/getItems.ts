import { ipcRenderer } from "electron";
import { FreeQueue as FQChannel } from "../../../main-process/database/channel-name";
import { FQItem } from "../wrapper/types";

export const getItems = (): Array<FQItem> => {
  return ipcRenderer.sendSync(FQChannel.GET_ITEMS);
};
