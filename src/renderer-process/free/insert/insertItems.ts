import { FQCandidate, FQItem } from "../wrapper/types";
import { ipcRenderer } from "electron";
import { FreeQueue as FQChannel } from "../../../main-process/database/channel-name";
import { v4 } from "uuid";
import moment from "moment";
import { List } from "immutable";

/**
 * Get problem's difficulty with Sync function.
 * It must return positive integer or zero.
 *
 * @param {FQCandidate} candidate - A `FreeQueueCandidate` you want to get difficulty.
 * @returns {boolean} - Positive integer or zero.
 */
const getProblemDifficulty = (candidate: FQCandidate): number => {
  return ipcRenderer.sendSync(FQChannel.GET_PROBLEM_DIFFICULTY, candidate);
};

/**
 * Get problem's experimental status with Sync function.
 *
 * @param {FQCandidate} candidate - A `FreeQueueCandidate` you want to get experimental status.
 * @returns {boolean} - Return 'true' if problems status is experimental, otherwise 'false'.
 */
const getProblemExperimentalStatus = (candidate: FQCandidate): boolean => {
  return ipcRenderer.sendSync(
    FQChannel.GET_PROBLEM_EXPERIMENTAL_STATUS,
    candidate
  );
};

/**
 * Create a {FQItem} you insert into the database.
 *
 * @see insertIntoDatabase
 * @param {FQCandidate} candidate - A 'FQCandidate' to convert `FQItem`
 * @returns {FQItem} - A 'FQItem'
 */
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
  ipcRenderer.send(FQChannel.INSERT_ITEMS, fqis);
};
