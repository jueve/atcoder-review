import * as fs from "fs";
import { ipcMain } from "electron";
import { resolvePath } from "../resolvePath";

type CreateBaseDirectory =
  | "CREATE_BASE_DIRECTORY"
  | "CREATE_BASE_DIRECTORY_SUCCEEDED"
  | "CREATE_BASE_DIRECTORY_FAILED";

export const CREATE_BASE_DIRECTORY = "CREATE_BASE_DIRECTORY";
export const CREATE_BASE_DIRECTORY_SUCCEEDED =
  "CREATE_BASE_DIRECTORY_SUCCEEDED";
export const CREATE_BASE_DIRECTORY_FAILED = "CREATE_BASE_DIRECTORY_FAILED";

const message: Record<string, string> = {
  succeeded: "Succeeded to create the base directory.",
  failed: "Failed to create the base directory.",
  exists: "The base directory already exists.",
};

export const createBaseDirectory = (
  begin: CreateBaseDirectory,
  succeeded: CreateBaseDirectory,
  failed: CreateBaseDirectory
): void => {
  const base = resolvePath("");
  ipcMain.on(begin, (event) => {
    try {
      if (fs.existsSync(base)) {
        event.reply(succeeded, message.exists);
      } else {
        fs.mkdir(base, (error) => {
          if (error) {
            event.reply(failed, message.failed);
            console.log(error);
          } else {
            event.reply(succeeded, message.succeeded);
          }
        });
      }
    } catch (error) {
      event.reply(failed, message.failed);
      console.log(error);
    }
  });
};
