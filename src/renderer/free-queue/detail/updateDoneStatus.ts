import { FQItem } from "../wrapper/types";
import { ipcRenderer } from "electron";
import { UPDATE_DONE_STATUS } from "../../../main/database/free-queue/updateDoneStatus";

export const updateDoneStatus = (status: boolean, fqi: FQItem): void => {
  ipcRenderer.send(UPDATE_DONE_STATUS, status, fqi);
};
