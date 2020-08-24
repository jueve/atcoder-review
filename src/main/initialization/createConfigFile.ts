import * as fs from "fs";
import { ipcMain } from "electron";
import { Config } from "../types";
import { resolvePath } from "../resolvePath";
import { CONFIG } from "../constants";

type CreateConfigFile =
  | "CREATE_CONFIG_FILE"
  | "CREATE_CONFIG_FILE_SUCCEEDED"
  | "CREATE_CONFIG_FILE_FAILED";

export const CREATE_CONFIG_FILE = "CREATE_CONFIG_FILE";
export const CREATE_CONFIG_FILE_SUCCEEDED = "CREATE_CONFIG_FILE_SUCCEEDED";
export const CREATE_CONFIG_FILE_FAILED = "CREATE_CONFIG_FILE_FAILED";

const message: Record<string, string> = {
  succeeded: "Succeeded to create the configuration file.",
  failed: "Failed to create the configuration file.",
  exists: "The configuration file already exists.",
  broken: "The configuration file was broken, and regenerated new one.",
};

const init: Config = {
  userId: null,
  switchToCollect: {
    abc: true,
    arc: true,
    agc: true,
    joi: true,
    past: true,
    jag: true,
    otherRated: true,
    otherUnrated: true,
  },
  userSubmissions: {
    lengthOfDays: 365,
    lengthOfSubmissions: 5000,
  },
};

const propertiesFullFilled = (config: Config): boolean => {
  return (
    config.userId !== undefined &&
    config.userSubmissions.lengthOfSubmissions !== undefined &&
    config.userSubmissions.lengthOfDays !== undefined &&
    config.switchToCollect.abc !== undefined &&
    config.switchToCollect.arc !== undefined &&
    config.switchToCollect.agc !== undefined &&
    config.switchToCollect.joi !== undefined &&
    config.switchToCollect.past !== undefined &&
    config.switchToCollect.jag !== undefined &&
    config.switchToCollect.otherRated !== undefined &&
    config.switchToCollect.otherUnrated !== undefined
  );
};

export const createConfigFile = (
  begin: CreateConfigFile,
  succeeded: CreateConfigFile,
  failed: CreateConfigFile
): void => {
  const config = resolvePath(CONFIG);
  ipcMain.on(begin, async (event) => {
    try {
      if (fs.existsSync(config)) {
        const data: string = await fs.promises.readFile(config, {
          encoding: "utf-8",
        });
        const schema: Config = JSON.parse(data);
        if (propertiesFullFilled(schema)) {
          event.reply(succeeded, message.exists);
        } else {
          fs.promises
            .writeFile(config, JSON.stringify(init), {
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
          .writeFile(config, JSON.stringify(init), {
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
      event.reply(failed);
    }
  });
};
