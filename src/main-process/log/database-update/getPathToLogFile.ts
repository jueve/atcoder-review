import process from "process";
import * as path from "path";
import { basePathInDevelopment, basePathInProduction } from "../../base-path";

export const getPathToLogFile = (): string => {
  if (process.env.NODE_ENV === "development") {
    return path.join(basePathInDevelopment, "/database-update-log.json");
  } else {
    return path.join(basePathInProduction, "/database-update-log.json");
  }
};
