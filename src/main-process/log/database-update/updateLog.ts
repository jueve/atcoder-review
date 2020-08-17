import * as fs from "fs";
import { ipcMain } from "electron";
import { UpdateDatabaseLog } from "../types";
import { resolvePath } from "../../resolvePath";
import { DATABASE_UPDATE_LOG } from "../../constants";

type UpdateLog = "UPDATE_LOG" | "UPDATE_LOG_SUCCEEDED" | "UPDATE_LOG_FAILED";
export const UPDATE_LOG = "UPDATE_LOG";
export const UPDATE_LOG_SUCCEEDED = "UPDATE_LOG_SUCCEEDED";
export const UPDATE_LOG_FAILED = "UPDATE_LOG_FAILED";

export const updateLog = (
  begin: UpdateLog,
  succeeded: UpdateLog,
  failed: UpdateLog
): void => {
  const log = resolvePath(DATABASE_UPDATE_LOG);
  ipcMain.on(begin, (event, newLog: UpdateDatabaseLog) => {
    try {
      if (fs.existsSync(log)) {
        fs.writeFile(log, JSON.stringify(newLog), { flag: "w" }, (_error) => {
          event.reply(succeeded);
        });
      } else {
        event.reply(failed);
      }
    } catch (e) {
      event.reply(failed);
      console.log(e);
    }
  });
};
