import { TableName } from "../TableName";
import { ipcMain } from "electron";
import database from "../../database";
import { Candidate } from "../../../defines/Candidate";

interface Difficulty {
  difficulty: number | undefined | null;
}

type GetDifficulty =
  | "GET_DIFFICULTY"
  | "GET_DIFFICULTY_SUCCEEDED"
  | "GET_DIFFICULTY_FAILED";
type FreeQueueCandidate = Candidate.FreeQueueCandidate;

export const GET_DIFFICULTY = "GET_DIFFICULTY";
export const GET_DIFFICULTY_SUCCEEDED = "GET_DIFFICULTY_SUCCEEDED";
export const GET_DIFFICULTY_FAILED = "GET_DIFFICULTY_FAILED";

export const getDifficulty = (
  problemModels: TableName,
  begin: GetDifficulty,
  succeeded: GetDifficulty,
  failed: GetDifficulty
): void => {
  ipcMain.on(begin, (event, fqc: FreeQueueCandidate) => {
    try {
      database(problemModels)
        .select("difficulty")
        .where({ problem_id: fqc.problem_id })
        .then((rows: Array<Difficulty>) => {
          if (
            rows === undefined ||
            rows === null ||
            rows.length === 0 ||
            rows[0].difficulty === null
          ) {
            event.returnValue = Number.MIN_SAFE_INTEGER;
          } else {
            event.returnValue = Math.floor(Math.max(rows[0].difficulty, 0));
          }
          event.reply(succeeded);
        })
        .catch((_res) => {
          event.returnValue = Number.MIN_SAFE_INTEGER;
          event.reply(failed);
        });
    } catch (e) {
      event.returnValue = Number.MIN_SAFE_INTEGER;
      event.reply(failed);
      console.log(e);
    }
  });
};
