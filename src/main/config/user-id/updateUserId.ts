import * as fs from "fs";
import { CONFIG } from "../../constants";
import { resolvePath } from "../../resolvePath";
import { ipcMain } from "electron";

type UpdateUserId =
  | "UPDATE_USER_ID"
  | "UPDATE_USER_ID_SUCCEEDED"
  | "UPDATE_USER_ID_FAILED";

export const UPDATE_USER_ID = "UPDATE_USER_ID";
export const UPDATE_USER_ID_SUCCEEDED = "UPDATE_USER_ID_SUCCEEDED";
export const UPDATE_USER_ID_FAILED = "UPDATE_USER_ID_FAILED";

export const updateUserId = (
  begin: UpdateUserId,
  succeeded: UpdateUserId,
  failed: UpdateUserId
): void => {
  ipcMain.on(begin, (event, newUserId: string) => {
    const config = resolvePath(CONFIG);
    try {
      if (fs.existsSync(config)) {
        fs.readFile(config, (_error, data) => {
          const schema = JSON.parse(data.toString());
          if (schema.userId !== undefined) {
            schema.userId = newUserId;
            fs.writeFile(
              config,
              JSON.stringify(schema),
              { flag: "w" },
              (_error) => {
                event.reply(succeeded);
              }
            );
          } else {
            event.reply(failed);
          }
        });
      } else {
        event.reply(failed);
      }
    } catch (e) {
      event.reply(failed);
    }
  });
};
