import { FQCandidate, FQItem } from "../wrapper/types";
import { ipcRenderer } from "electron";
import { v4 } from "uuid";
import moment from "moment";
import { List } from "immutable";
import { GET_DIFFICULTY } from "../../../main/database/free-queue/getDifficulty";
import { GET_EXPERIMENTAL_STATUS } from "../../../main/database/free-queue/getExperimentalStatus";
import { INSERT_ITEMS } from "../../../main/database/free-queue/insertItems";

const getProblemDifficulty = (candidate: FQCandidate): number => {
  return ipcRenderer.sendSync(GET_DIFFICULTY, candidate);
};

const getProblemExperimentalStatus = (candidate: FQCandidate): boolean => {
  return ipcRenderer.sendSync(GET_EXPERIMENTAL_STATUS, candidate);
};

const createFreeQueueItem = (candidate: FQCandidate): FQItem => {
  return {
    id: v4(),
    is_done: false,
    start_epoch_second: candidate.start_epoch_second,
    problem_title: candidate.problem_title,
    contest_title: candidate.contest_title,
    difficulty: getProblemDifficulty(candidate),
    is_experimental: getProblemExperimentalStatus(candidate),
    url: `https://atcoder.jp/contests/${candidate.contest_id}/tasks/${candidate.problem_id}`,
    date: moment().unix(),
  };
};

export const insertItems = (fqcs: List<FQCandidate>): void => {
  const fqis = fqcs
    .map((c) => createFreeQueueItem(c))
    .toArray()
    .reverse();
  ipcRenderer.send(INSERT_ITEMS, fqis);
};
