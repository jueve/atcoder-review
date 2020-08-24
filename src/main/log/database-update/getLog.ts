import * as fs from "fs";
import { ipcMain } from "electron";
import { DatabaseUpdateLog } from "../types";
import { resolvePath } from "../../resolvePath";
import { DATABASE_UPDATE_LOG } from "../../constants";

type GetLog = "GET_LOG" | "GET_LOG_SUCCEEDED" | "GET_LOG_FAILED";
export const GET_LOG = "GET_LOG";
export const GET_LOG_SUCCEEDED = "GET_LOG_SUCCEEDED";
export const GET_LOG_FAILED = "GET_LOG_FAILED";

export const getLog = (
  begin: GetLog,
  succeeded: GetLog,
  failed: GetLog
): void => {
  const init: DatabaseUpdateLog = {
    contests: null,
    problems: null,
    problemModels: null,
    userSubmissions: null,
  };
  const log = resolvePath(DATABASE_UPDATE_LOG);
  ipcMain.on(begin, (event) => {
    try {
      if (fs.existsSync(log)) {
        fs.readFile(log, (_error, data: Buffer) => {
          const schema: DatabaseUpdateLog = JSON.parse(data.toString());
          event.reply(succeeded, schema);
        });
      } else {
        event.reply(failed, init);
      }
    } catch (e) {
      event.reply(failed, init);
      console.log(e);
    }
  });
};
