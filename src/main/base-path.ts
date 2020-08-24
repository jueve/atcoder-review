import path from "path";
import process from "process";
import os from "os";

export const basePathInDevelopment: string = path.join(
  process.cwd(),
  "/.atcoder-review"
);
export const basePathInProduction: string = path.join(
  os.homedir(),
  "/.atcoder-review"
);
