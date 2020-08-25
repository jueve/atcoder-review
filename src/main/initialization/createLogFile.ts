import * as fs from "fs";
import { ipcMain } from "electron";
import { resolvePath } from "../resolvePath";
import { LOG } from "../constants";

type CreateLogFile =
  | "CREATE_LOG_FILE"
  | "CREATE_LOG_FILE_SUCCEEDED"
  | "CREATE_LOG_FILE_FAILED";

export const CREATE_LOG_FILE = "CREATE_LOG_FILE";
export const CREATE_LOG_FILE_SUCCEEDED = "CREATE_LOG_FILE_SUCCEEDED";
export const CREATE_LOG_FILE_FAILED = "CREATE_LOG_FILE_FAILED";

const message: Record<string, string> = {
  succeeded: "Succeeded to create the log file.",
  failed: "Failed to create the log file.",
  exists: "The log file already exists.",
  broken: "The log file was broken, and regenerated new one.",
};

export const createLogFile = (
  begin: CreateLogFile,
  succeeded: CreateLogFile,
  failed: CreateLogFile
): void => {
  const log = resolvePath(LOG);
  ipcMain.on(begin, async (event) => {
    try {
      if (fs.existsSync(log)) {
        event.reply(succeeded, message.exists);
      } else {
        fs.promises
          .writeFile(log, "", {
            encoding: "utf-8",
            flag: "w",
          })
          .then(() => {
            event.reply(succeeded, message.succeeded);
          })
          .catch((error) => {
            console.log(error);
            event.reply(failed, message.failed);
          });
      }
    } catch (error) {
      console.log(error);
      event.reply(failed, message.failed);
    }
  });
};
