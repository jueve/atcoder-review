import { ipcRenderer } from "electron";
import { CREATE_BASE_DIRECTORY } from "./main-process/initialization/createBaseDirectory";
import { CREATE_LOG_FILE } from "./main-process/initialization/createLogFile";
import { CREATE_DATABASE_UPDATE_LOG_FILE } from "./main-process/initialization/createDatabaseUpdateLogFile";
import { CREATE_CONFIG_FILE } from "./main-process/initialization/createConfigFile";
import { CREATE_DATABASE_TABLES } from "./main-process/initialization/createDatabaseTables";

export const initialize = (): void => {
  ipcRenderer.send(CREATE_BASE_DIRECTORY);
  ipcRenderer.send(CREATE_LOG_FILE);
  ipcRenderer.send(CREATE_DATABASE_UPDATE_LOG_FILE);
  ipcRenderer.send(CREATE_CONFIG_FILE);
  ipcRenderer.send(CREATE_DATABASE_TABLES);
};
