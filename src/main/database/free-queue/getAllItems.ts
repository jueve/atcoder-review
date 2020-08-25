import { TableName } from "../TableName";
import { ipcMain } from "electron";
import { database } from "../../database";
import { Item } from "../../../defines/Item";
import { writeLog } from "../../log/database-operations/writeLog";
import { createLogFormat } from "../../log/database-operations/createLogFormat";
import moment from "moment";

type FQItem = Item.FreeQueueItem;
type GetAllItems =
  | "GET_ALL_ITEMS"
  | "GET_ALL_ITEMS_SUCCEEDED"
  | "GET_ALL_ITEMS_FAILED";

export const GET_ALL_ITEMS = "GET_ALL_ITEMS";
export const GET_ALL_ITEMS_SUCCEEDED = "GET_ALL_ITEMS_SUCCEEDED";
export const GET_ALL_ITEMS_FAILED = "GET_ALL_ITEMS_FAILED";

export const getAllItems = (
  freeQueue: TableName,
  begin: GetAllItems,
  succeeded: GetAllItems,
  failed: GetAllItems
): void => {
  ipcMain.on(begin, (event) => {
    const date: string = moment().local().format("YYYY-MM-DD HH:mm:ss");
    try {
      database(freeQueue)
        .select()
        .then((fqis: Array<FQItem>) => {
          event.reply(succeeded, fqis.reverse());
          writeLog(
            createLogFormat(date, "SUCCEEDED", "Got records from 'free_queue'.")
          );
        })
        .catch((error: Error) => {
          event.reply(failed, []);
          writeLog(createLogFormat(date, "FAILED", error.message));
        });
    } catch (error) {
      event.reply(failed, []);
      writeLog(createLogFormat(date, "FAILED", error.message));
    }
  });
};
