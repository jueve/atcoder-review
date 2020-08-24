import { TableName } from "../TableName";
import { ipcMain } from "electron";
import { database } from "../../database";
import { Item } from "../../../defines/Item";

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
    try {
      database(freeQueue)
        .select()
        .then((fqis: Array<FQItem>) => {
          event.reply(succeeded, fqis.reverse());
        })
        .catch((error) => {
          event.reply(failed, []);
        });
    } catch (error) {
      event.reply(failed, []);
      console.log(error);
    }
  });
};
