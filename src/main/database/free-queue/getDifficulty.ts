import { TableName } from "../TableName";
import { ipcMain } from "electron";
import { database } from "../../database";
import { Candidate } from "../../../defines/Candidate";
import { writeLog } from "../../log/database-operations/writeLog";
import { createLogFormat } from "../../log/database-operations/createLogFormat";
import moment from "moment";

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
    const date: string = moment().local().format("YYYY-MM-DD HH:mm:ss");
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
            writeLog(
              createLogFormat(
                date,
                "SUCCEEDED",
                "Difficulty not found from 'problem_models', and returned dummy value."
              )
            );
          } else {
            const d = rows[0].difficulty as number;
            event.returnValue = Math.floor(Math.max(d, 0));
            writeLog(
              createLogFormat(
                date,
                "SUCCEEDED",
                "Got a record from 'problem_models'."
              )
            );
          }
        })
        .catch((error: Error) => {
          event.returnValue = Number.MIN_SAFE_INTEGER;
          writeLog(createLogFormat(date, "FAILED", error.message));
        });
    } catch (error) {
      event.returnValue = Number.MIN_SAFE_INTEGER;
      writeLog(createLogFormat(date, "FAILED", error.message));
    }
  });
};
