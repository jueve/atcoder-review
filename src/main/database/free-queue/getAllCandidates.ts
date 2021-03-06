import { TableName } from "../TableName";
import { ipcMain } from "electron";
import { database } from "../../database";
import { Contest } from "../../../defines/Contest";
import { Problem } from "../../../defines/Problem";
import { Candidate } from "../../../defines/Candidate";
import { writeLog } from "../../log/database-operations/writeLog";
import { createLogFormat } from "../../log/database-operations/createLogFormat";
import moment from "moment";

type Contest = Contest.Contest;
type Problem = Problem.Problem;
type FreeQueueCandidate = Candidate.FreeQueueCandidate;
type Dictionary = Record<string, Contest>;
type GetAllCandidates =
  | "GET_ALL_CANDIDATES"
  | "GET_ALL_CANDIDATES_SUCCEEDED"
  | "GET_ALL_CANDIDATES_FAILED";

export const GET_ALL_CANDIDATES = "GET_ALL_CANDIDATES";
export const GET_ALL_CANDIDATES_SUCCEEDED = "GET_ALL_CANDIDATES_SUCCEEDED";
export const GET_ALL_CANDIDATES_FAILED = "GET_ALL_CANDIDATES_FAILED";

export const getAllCandidates = (
  problems: TableName,
  contests: TableName,
  begin: GetAllCandidates,
  succeeded: GetAllCandidates,
  failed: GetAllCandidates
): void => {
  ipcMain.on(begin, (event) => {
    const date: string = moment().local().format("YYYY-MM-DD HH:mm:ss");
    try {
      database(problems)
        .select()
        .then((ps: Array<Problem>) => {
          database(contests)
            .select()
            .then((cs: Array<Contest>) => {
              const dict: Dictionary = {};
              const fqcs: Array<FreeQueueCandidate> = [];

              cs.forEach((c: Contest) => {
                dict[c.contest_id] = c;
              });

              ps.forEach((p: Problem) => {
                fqcs.push({
                  id: p.id,
                  start_epoch_second: dict[p.contest_id].start_epoch_second,
                  problem_id: p.problem_id,
                  contest_id: p.contest_id,
                  problem_title: p.problem_title,
                  contest_title: dict[p.contest_id].contest_title,
                  rate_change: dict[p.contest_id].rate_change,
                });
              });

              event.reply(succeeded, fqcs);
              writeLog(
                createLogFormat(
                  date,
                  "SUCCEEDED",
                  "Got records from 'contests'."
                )
              );
            })
            .catch((error: Error) => {
              writeLog(createLogFormat(date, "FAILED", error.message));
              event.reply(failed, []);
            });
        })
        .catch((error: Error) => {
          event.reply(failed, []);
          writeLog(createLogFormat(date, "FAILED", error.message));
        });
    } catch (error) {
      event.reply(failed, []);
      writeLog(createLogFormat(date, "FAILED", error.message));
    }
  });
};
