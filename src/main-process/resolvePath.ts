import * as process from "process";
import * as path from "path";
import { basePathInDevelopment, basePathInProduction } from "./base-path";

export const resolvePath = (filePath: string): string => {
  if (process.env.NODE_ENV === "development") {
    return path.join(basePathInDevelopment, filePath);
  } else {
    return path.join(basePathInProduction, filePath);
  }
};
