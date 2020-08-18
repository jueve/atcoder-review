import * as fs from "fs";
import { CONFIG } from "../../constants";
import { resolvePath } from "../../resolvePath";
import { ipcMain } from "electron";

type GetUserId = "GET_USER_ID" | "GET_USER_ID_SUCCEEDED" | "GET_USER_ID_FAILED";

export const GET_USER_ID = "GET_USER_ID";
export const GET_USER_ID_SUCCEEDED = "GET_USER_ID_SUCCEEDED";
export const GET_USER_ID_FAILED = "GET_USER_ID_FAILED";

export const getUserId = (
  begin: GetUserId,
  succeeded: GetUserId,
  failed: GetUserId
): void => {
  ipcMain.on(begin, (event) => {
    const init: any = null;
    const config = resolvePath(CONFIG);
    try {
      if (fs.existsSync(config)) {
        fs.readFile(config, (_error, data: Buffer) => {
          const schema = JSON.parse(data.toString());
          if (schema.userId !== undefined) {
            event.reply(succeeded, schema.userId);
          } else {
            event.reply(failed, init);
          }
        });
      } else {
        event.reply(failed, init);
      }
    } catch (e) {
      event.reply(failed, init);
    }
  });
};
