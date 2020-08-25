import { TableName } from "../TableName";
import { ipcMain } from "electron";
import { database } from "../../database";
import { Item } from "../../../defines/Item";
import { writeLog } from "../../log/database-operations/writeLog";
import { createLogFormat } from "../../log/database-operations/createLogFormat";
import moment from "moment";

type DeleteItems =
  | "DELETE_ITEMS"
  | "DELETE_ITEMS_SUCCEEDED"
  | "DELETE_ITEMS_FAILED";
type FreeQueueItem = Item.FreeQueueItem;

export const DELETE_ITEMS = "DELETE_ITEMS";
export const DELETE_ITEMS_SUCCEEDED = "DELETE_ITEMS_SUCCEEDED";
export const DELETE_ITEMS_FAILED = "DELETE_ITEMS_FAILED";

export const deleteItems = (
  freeQueue: TableName,
  begin: DeleteItems,
  succeeded: DeleteItems,
  failed: DeleteItems
): void => {
  ipcMain.on(begin, (event, items: Array<FreeQueueItem>) => {
    const date: string = moment().local().format("YYYY-MM-DD HH:mm:ss");
    try {
      const l: number = items.length;
      let count = 0;
      items.forEach((fqi) => {
        database(freeQueue)
          .where("id", fqi.id)
          .del()
          // 'l == 0' means that you delete no items from Free Queue.
          .then((res: number) => {
            count += 1;
            if (l === 0 || count >= l) {
              event.reply(succeeded);
              writeLog(
                createLogFormat(
                  date,
                  "SUCCEEDED",
                  "Deleted records from 'free_queue'."
                )
              );
            }
          })
          .catch((error: Error) => {
            event.reply(failed);
            writeLog(createLogFormat(date, "FAILED", error.message));
          });
      });
    } catch (error) {
      event.reply(failed);
      writeLog(createLogFormat(date, "FAILED", error.message));
    }
  });
};
