import { TableName } from "../TableName";
import { ipcMain } from "electron";
import { database } from "../../database";
import { Item } from "../../../defines/Item";
import { writeLog } from "../../log/database-operations/writeLog";
import { createLogFormat } from "../../log/database-operations/createLogFormat";
import moment from "moment";

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
    const date: string = moment().local().format("YYYY-MM-DD HH:mm:ss");
    try {
      database(freeQueue)
        .where({ id: fqi.id })
        .update({ is_done: status })
        .then((_res) => {
          event.reply(succeeded);
          writeLog(
            createLogFormat(
              date,
              "SUCCEEDED",
              "Updated a record in 'free_queue'."
            )
          );
        })
        .catch((error: Error) => {
          event.reply(failed);
          writeLog(createLogFormat(date, "FAILED", error.message));
        });
    } catch (error) {
      event.reply(failed);
      writeLog(createLogFormat(date, "FAILED", error.message));
    }
  });
};
