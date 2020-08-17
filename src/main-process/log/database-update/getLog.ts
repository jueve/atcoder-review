import * as fs from "fs";
import { getPathToLogFile } from "./getPathToLogFile";
import { ipcMain } from "electron";
import { UpdateDatabaseLog } from "../types";

type GetLog = "GET_LOG" | "GET_LOG_SUCCEEDED" | "GET_LOG_FAILED";
export const GET_LOG = "GET_LOG";
export const GET_LOG_SUCCEEDED = "GET_LOG_SUCCEEDED";
export const GET_LOG_FAILED = "GET_LOG_FAILED";

export const getLog = (
  begin: GetLog,
  succeeded: GetLog,
  failed: GetLog
): void => {
  const init: UpdateDatabaseLog = {
    contests: Number.MIN_SAFE_INTEGER,
    problems: Number.MIN_SAFE_INTEGER,
    problemModels: Number.MIN_SAFE_INTEGER,
    userSubmissions: Number.MIN_SAFE_INTEGER,
  };
  const log = getPathToLogFile();
  ipcMain.on(begin, (event) => {
    try {
      if (fs.existsSync(log)) {
        fs.readFile(log, (_error, data: Buffer) => {
          const schema: UpdateDatabaseLog = JSON.parse(data.toString());
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
