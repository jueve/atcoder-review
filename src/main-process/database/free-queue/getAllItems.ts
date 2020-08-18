import { TableName } from "../TableName";
import { ipcMain } from "electron";
import { database } from "../../database";

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
        .then((fqis) => {
          const rev = fqis.reverse();
          event.returnValue = rev;
          event.reply(succeeded, rev);
        })
        .catch((_res) => {
          event.returnValue = [];
          event.reply(failed, []);
        });
    } catch (e) {
      event.returnValue = [];
      event.reply(failed, []);
      console.log(e);
    }
  });
};
