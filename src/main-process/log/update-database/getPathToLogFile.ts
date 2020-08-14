import process from "process";
import path from "path";
import { basePathInDevelopment, basePathInProduction } from "../../base-path";

export const getPathToLogFile = (): string => {
  if (process.env.NODE_ENV === "development") {
    return path.join(basePathInDevelopment, "/update-database-log.json");
  } else {
    return path.join(basePathInProduction, "/update-database-log.json");
  }
};
