import { FQItem } from "../wrapper/types";
import { ipcRenderer } from "electron";
import { FreeQueue as FQChannel } from "../../../main-process/database/channel-name";

export const getItem = (id: string): null | FQItem => {
  const items = ipcRenderer.sendSync(FQChannel.GET_ITEM, id);
  if (items === []) {
    return null;
  } else {
    return items[0];
  }
};
