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
  user_id: null,
  switch_to_collect: {
    abc: true,
    arc: true,
    agc: true,
    joi: true,
    past: true,
    jag: true,
    other_rated: true,
    other_unrated: true,
  },
  user_submissions: {
    length_of_days: 365,
    length_of_submissions: 5000,
  },
};

const propertiesFullFilled = (config: Config): boolean => {
  return (
    config.user_id !== undefined &&
    config.user_submissions.length_of_submissions !== undefined &&
    config.user_submissions.length_of_days !== undefined &&
    config.switch_to_collect.abc !== undefined &&
    config.switch_to_collect.arc !== undefined &&
    config.switch_to_collect.agc !== undefined &&
    config.switch_to_collect.joi !== undefined &&
    config.switch_to_collect.past !== undefined &&
    config.switch_to_collect.jag !== undefined &&
    config.switch_to_collect.other_rated !== undefined &&
    config.switch_to_collect.other_unrated !== undefined
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
