import * as fs from "fs";
import { resolvePath } from "../../resolvePath";
import { LOG } from "../../constants";

export const writeLog = (content: string): void => {
  const log = resolvePath(LOG);
  fs.promises.writeFile(log, content, { flag: "a" });
};
