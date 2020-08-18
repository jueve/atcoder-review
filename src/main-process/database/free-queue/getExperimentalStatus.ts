import { TableName } from "../TableName";
import { ipcMain } from "electron";
import { database } from "../../database";
import { Candidate } from "../../../defines/Candidate";

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
          } else {
            event.returnValue = rows[0].is_experimental;
          }
          event.reply(succeeded);
        })
        .catch((_res) => {
          event.returnValue = false;
          event.reply(failed);
        });
    } catch (e) {
      event.returnValue = false;
      event.reply(failed);
      console.log(e);
    }
  });
};
