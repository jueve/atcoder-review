import { ipcRenderer } from "electron";
import { CREATE_BASE_DIRECTORY } from "./initialization/createBaseDirectory";
import { CREATE_LOG_FILE } from "./initialization/createLogFile";
import { CREATE_DATABASE_UPDATE_LOG_FILE } from "./initialization/createDatabaseUpdateLogFile";
import { CREATE_CONFIG_FILE } from "./initialization/createConfigFile";
import { CREATE_DATABASE_TABLES } from "./initialization/createDatabaseTables";

export const initialize = (): void => {
  ipcRenderer.send(CREATE_BASE_DIRECTORY);
  ipcRenderer.send(CREATE_LOG_FILE);
  ipcRenderer.send(CREATE_DATABASE_UPDATE_LOG_FILE);
  ipcRenderer.send(CREATE_CONFIG_FILE);
  ipcRenderer.send(CREATE_DATABASE_TABLES);
};
