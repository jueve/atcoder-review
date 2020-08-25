import { TableName } from "../TableName";
import { ipcMain } from "electron";
import { database } from "../../database";
import { Candidate } from "../../../defines/Candidate";
import { writeLog } from "../../log/database-operations/writeLog";
import { createLogFormat } from "../../log/database-operations/createLogFormat";
import moment from "moment";

interface ExperimentalStatus {
  is_experimental: boolean | undefined | null;
}

type FreeQueueCandidate = Candidate.FreeQueueCandidate;
type GetExperimentalStatus =
  | "GET_EXPERIMENTAL_STATUS"
  | "GET_EXPERIMENTAL_STATUS_SUCCEEDED"
  | "GET_EXPERIMENTAL_STATUS_FAILED";

export const GET_EXPERIMENTAL_STATUS = "GET_EXPERIMENTAL_STATUS";
export const GET_EXPERIMENTAL_STATUS_SUCCEEDED =
  "GET_EXPERIMENTAL_STATUS_SUCCEEDED";
export const GET_EXPERIMENTAL_STATUS_FAILED = "GET_EXPERIMENTAL_STATUS_FAILED";

export const getExperimentalStatus = (
  problemModels: TableName,
  begin: GetExperimentalStatus,
  succeeded: GetExperimentalStatus,
  failed: GetExperimentalStatus
): void => {
  ipcMain.on(begin, (event, fqc: FreeQueueCandidate) => {
    const date: string = moment().local().format("YYYY-MM-DD HH:mm:ss");
    try {
      database(problemModels)
        .select("is_experimental")
        .where({ problem_id: fqc.problem_id })
        .then((rows: Array<ExperimentalStatus>) => {
          if (
            rows === undefined ||
            rows === null ||
            rows.length === 0 ||
            rows[0].is_experimental === null
          ) {
            event.returnValue = false;
            createLogFormat(
              date,
              "SUCCEEDED",
              "Experimental status not found from 'problem_models', and returned dummy value."
            );
          } else {
            event.returnValue = rows[0].is_experimental;
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
          event.returnValue = false;
          writeLog(createLogFormat(date, "FAILED", error.message));
        });
    } catch (error) {
      event.returnValue = false;
      writeLog(createLogFormat(date, "FAILED", error.message));
    }
  });
};
