import { TableName } from "../TableName";
import { ipcMain } from "electron";
import database from "../../../database";
import { Item } from "../../../defines/Item";

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
    try {
      items.forEach((fqi) => {
        database(freeQueue)
          .where("id", fqi.id)
          .del()
          .then((res) => res);
      });
      event.reply(succeeded);
    } catch (e) {
      event.reply(failed);
      console.log(e);
    }
  });
};
