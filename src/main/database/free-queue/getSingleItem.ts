import { TableName } from "../TableName";
import { ipcMain } from "electron";
import { database } from "../../database";
import { writeLog } from "../../log/database-operations/writeLog";
import { createLogFormat } from "../../log/database-operations/createLogFormat";
import moment from "moment";

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
    const date: string = moment().local().format("YYYY-MM-DD HH:mm:ss");
    try {
      database(freeQueue)
        .select()
        .where({ id: id })
        .then((fqis) => {
          event.reply(succeeded, fqis);
          writeLog(
            createLogFormat(
              date,
              "SUCCEEDED",
              "Got a record from 'free_queue'."
            )
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
