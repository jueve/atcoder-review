import { TableName } from "../TableName";
import { ipcMain } from "electron";
import { database } from "../../database";
import { Item } from "../../../defines/Item";

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
    try {
      fqis.forEach((fqi) => {
        database(freeQueue)
          .insert(fqi)
          .then((res) => res)
          .catch((res) => {
            event.reply(failed);
          });
      });
      event.reply(succeeded);
    } catch (e) {
      event.reply(failed);
      console.log(e);
    }
  });
};
