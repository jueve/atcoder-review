import { ipcRenderer } from "electron";
import { GET_ALL_CANDIDATES } from "../../../main/database/free-queue/getAllCandidates";

export const getCandidates = (): void => {
  return ipcRenderer.send(GET_ALL_CANDIDATES);
};
