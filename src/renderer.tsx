/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./theme/index.css";
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { ipcRenderer } from "electron";
import { CREATE_BASE_DIRECTORY } from "./main-process/initialization/createBaseDirectory";
import { CREATE_CONFIG_FILE } from "./main-process/initialization/createConfigFile";
import { CREATE_DATABASE_UPDATE_LOG_FILE } from "./main-process/initialization/createDatabaseUpdateLogFile";
import { CREATE_LOG_FILE } from "./main-process/initialization/createLogFile";
import { CREATE_DATABASE_TABLES } from "./main-process/initialization/createDatabaseTables";
import { initialize } from "./initialize";

const root = document.createElement("div");
const fontIcons = document.createElement("link");
const noto = document.createElement("link");
const roboto = document.createElement("link");

root.setAttribute("id", "root");
fontIcons.setAttribute("rel", "stylesheet");
fontIcons.setAttribute(
  "href",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
);
noto.setAttribute("rel", "stylesheet");
noto.setAttribute(
  "href",
  "https://fonts.googleapis.com/css?family=Noto+Sans+JP:300,400,500,700"
);
roboto.setAttribute("rel", "stylesheet");
roboto.setAttribute(
  "href",
  "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
);
document.body.appendChild(root);
document.head.appendChild(fontIcons);
document.head.appendChild(noto);
document.head.appendChild(roboto);
const renderApplication = async (): Promise<void> => {
  const { default: App } = await import("./App");
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById("root")
  );
};

renderApplication();
initialize();
