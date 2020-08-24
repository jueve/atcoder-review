import React from "react";
import ReactDOM from "react-dom";
import { initialize } from "../main/initialize";
import { App } from "./App";

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
ReactDOM.render(<App />, document.getElementById("root"));

initialize();
