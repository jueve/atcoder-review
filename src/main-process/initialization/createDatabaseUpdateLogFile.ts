import * as fs from "fs";
import { ipcMain } from "electron";
import { DatabaseUpdateLog } from "../types";
import { resolvePath } from "../resolvePath";
import { DATABASE_UPDATE_LOG } from "../constants";

type CreateDatabaseUpdateLogFile =
  | "CREATE_DATABASE_UPDATE_LOG_FILE"
  | "CREATE_DATABASE_UPDATE_LOG_FILE_SUCCEEDED"
  | "CREATE_DATABASE_UPDATE_LOG_FILE_FAILED";

export const CREATE_DATABASE_UPDATE_LOG_FILE =
  "CREATE_DATABASE_UPDATE_LOG_FILE";
export const CREATE_DATABASE_UPDATE_LOG_FILE_SUCCEEDED =
  "CREATE_DATABASE_UPDATE_LOG_FILE_SUCCEEDED";
export const CREATE_DATABASE_UPDATE_LOG_FILE_FAILED =
  "CREATE_DATABASE_UPDATE_LOG_FILE_FAILED";

const message: Record<string, string> = {
  succeeded: "Succeeded to create the database update log file.",
  failed: "Failed to create the database update log file.",
  exists: "The database update log file already exists.",
  broken: "The database update log file was broken, and regenerated new one.",
};

const init: DatabaseUpdateLog = {
  contests: null,
  problems: null,
  problemModels: null,
  userSubmissions: null,
};

const propertiesFullFilled = (log: DatabaseUpdateLog): boolean => {
  return (
    log.contests !== undefined &&
    log.problems !== undefined &&
    log.problemModels !== undefined &&
    log.userSubmissions !== undefined
  );
};

export const createDatabaseUpdateLogFile = (
  begin: CreateDatabaseUpdateLogFile,
  succeeded: CreateDatabaseUpdateLogFile,
  failed: CreateDatabaseUpdateLogFile
): void => {
  const databaseUpdateLog = resolvePath(DATABASE_UPDATE_LOG);
  ipcMain.on(begin, async (event) => {
    try {
      if (fs.existsSync(databaseUpdateLog)) {
        const data: string = await fs.promises.readFile(databaseUpdateLog, {
          encoding: "utf-8",
        });
        const schema: DatabaseUpdateLog = JSON.parse(data);

        if (propertiesFullFilled(schema)) {
          event.reply(succeeded, message.exists);
        } else {
          fs.promises
            .writeFile(databaseUpdateLog, JSON.stringify(init), {
              encoding: "utf-8",
              flag: "w",
            })
            .then(() => {
              event.reply(succeeded, message.broken);
            })
            .catch((error) => {
              event.reply(failed, message.failed);
              console.log(error);
            });
        }
      } else {
        fs.promises
          .writeFile(databaseUpdateLog, JSON.stringify(init), {
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
