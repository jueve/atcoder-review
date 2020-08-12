import { FQItem } from "../wrapper/types";
import { ipcRenderer } from "electron";
import { FreeQueue as FQChannel } from "../../../main-process/database/channel-name";

export const updateDoneStatus = (status: boolean, fqi: FQItem): void => {
  ipcRenderer.send(FQChannel.UPDATE_ITEM_DONE_STATUS, status, fqi);
};
