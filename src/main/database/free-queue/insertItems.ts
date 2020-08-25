import { TableName } from "../TableName";
import { ipcMain } from "electron";
import { database } from "../../database";
import { Item } from "../../../defines/Item";
import { writeLog } from "../../log/database-operations/writeLog";
import { createLogFormat } from "../../log/database-operations/createLogFormat";
import moment from "moment";

type InsertItems =
  | "INSERT_ITEMS"
  | "INSERT_ITEMS_SUCCEEDED"
  | "INSERT_ITEMS_FAILED";
type FreeQueueItem = Item.FreeQueueItem;

export const INSERT_ITEMS = "INSERT_ITEMS";
export const INSERT_ITEMS_SUCCEEDED = "INSERT_ITEMS_SUCCEEDED";
export const INSERT_ITEMS_FAILED = "INSERT_ITEMS_FAILED";

export const insertItems = (
  freeQueue: TableName,
  begin: InsertItems,
  succeeded: InsertItems,
  failed: InsertItems
): void => {
  ipcMain.on(begin, (event, fqis: Array<FreeQueueItem>): void => {
    const date: string = moment().local().format("YYYY-MM-DD HH:mm:ss");
    try {
      const l: number = fqis.length;
      fqis.forEach((fqi) => {
        database(freeQueue)
          .insert(fqi)
          .then((res: Array<number>) => {
            // 'l == 0' means that you insert no items into Free Queue.
            if (l === 0 || res[0] >= l) {
              event.reply(succeeded);
              writeLog(
                createLogFormat(
                  date,
                  "SUCCEEDED",
                  "Inserted records into 'free_queue'."
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
