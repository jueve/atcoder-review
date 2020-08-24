import { TableName } from "../TableName";
import { ipcMain } from "electron";
import { database } from "../../database";
import { Item } from "../../../defines/Item";

type UpdateDoneStatus =
  | "UPDATE_DONE_STATUS"
  | "UPDATE_DONE_STATUS_SUCCEEDED"
  | "UPDATE_DONE_STATUS_FAILED";
type FreeQueueItem = Item.FreeQueueItem;

export const UPDATE_DONE_STATUS = "UPDATE_DONE_STATUS";
export const UPDATE_DONE_STATUS_SUCCEEDED = "UPDATE_DONE_STATUS_SUCCEEDED";
export const UPDATE_DONE_STATUS_FAILED = "UPDATE_DONE_STATUS_FAILED";

export const updateDoneStatus = (
  freeQueue: TableName,
  begin: UpdateDoneStatus,
  succeeded: UpdateDoneStatus,
  failed: UpdateDoneStatus
): void => {
  ipcMain.on(begin, (event, status: boolean, fqi: FreeQueueItem): void => {
    try {
      database(freeQueue)
        .where({ id: fqi.id })
        .update({ is_done: status })
        .then((_res) => {
          event.reply(succeeded);
        })
        .catch((error) => {
          event.reply(failed);
          console.log(error);
        });
    } catch (e) {
      event.reply(failed);
      console.log(e);
    }
  });
};
