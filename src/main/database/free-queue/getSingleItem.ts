import { TableName } from "../TableName";
import { ipcMain } from "electron";
import { database } from "../../database";

type GetSingleItem =
  | "GET_SINGLE_ITEM"
  | "GET_SINGLE_ITEM_SUCCEEDED"
  | "GET_SINGLE_ITEM_FAILED";

export const GET_SINGLE_ITEM = "GET_SINGLE_ITEM";
export const GET_SINGLE_ITEM_SUCCEEDED = "GET_SINGLE_ITEM_SUCCEEDED";
export const GET_SINGLE_ITEM_FAILED = "GET_SINGLE_ITEM_FAILED";

export const getSingleItem = (
  freeQueue: TableName,
  begin: GetSingleItem,
  succeeded: GetSingleItem,
  failed: GetSingleItem
): void => {
  ipcMain.on(begin, (event, id: string) => {
    try {
      database(freeQueue)
        .select()
        .where({ id: id })
        .then((fqis) => {
          event.returnValue = fqis;
          event.reply(succeeded, fqis);
        })
        .catch((_res) => {
          event.reply(failed, []);
        });
    } catch (e) {
      event.returnValue = [];
      event.reply(failed, []);
      console.log(e);
    }
  });
};
