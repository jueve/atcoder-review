import { FQCandidate } from "../wrapper/types";
import { ipcRenderer } from "electron";
import { FreeQueue as FQChannel } from "../../../main-process/database/channel-name";

export const getCandidates = (): void => {
  return ipcRenderer.send(FQChannel.GET_CANDIDATES);
};
