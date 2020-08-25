import { TableName } from "../TableName";
import { ipcMain, net } from "electron";
import { database } from "../../database";
import { Problem } from "../../../defines/Problem";
import { v4 } from "uuid";
import { writeLog } from "../../log/database-operations/writeLog";
import { createLogFormat } from "../../log/database-operations/createLogFormat";
import moment from "moment";

type RawProblem = Problem.RawProblem;
type Problem = Problem.Problem;
type UpdateProblems =
  | "UPDATE_PROBLEMS"
  | "UPDATE_PROBLEMS_SUCCEEDED"
  | "UPDATE_PROBLEMS_FAILED";

export const UPDATE_PROBLEMS = "UPDATE_PROBLEMS";
export const UPDATE_PROBLEMS_SUCCEEDED = "UPDATE_PROBLEMS_SUCCEEDED";
export const UPDATE_PROBLEMS_FAILED = "UPDATE_PROBLEMS_FAILED";

const createProblemRecord = (raw: RawProblem): Problem => {
  return {
    id: v4(),
    problem_id: raw.id,
    contest_id: raw.contest_id,
    problem_title: raw.title,
  };
};

export const updateProblems = (
  problems: TableName,
  begin: UpdateProblems,
  succeeded: UpdateProblems,
  failed: UpdateProblems
): void => {
  ipcMain.on(begin, (event) => {
    const date: string = moment().local().format("YYYY-MM-DD HH:mm:ss");
    try {
      const requestForProblems = net.request({
        method: "GET",
        protocol: "https:",
        hostname: "kenkoooo.com",
        path: "/atcoder/resources/problems.json",
      });
      const chunks: Array<Buffer> = [];
      requestForProblems.on("response", (response) => {
        response
          .on("data", (chunk) => {
            chunks.push(chunk);
          })
          .on("end", () => {
            const data: Buffer = Buffer.concat(chunks);
            const schema = JSON.parse(data.toString());
            const l: number = schema.length;

            database(problems)
              .delete()
              .then((_res) => {
                writeLog(
                  createLogFormat(
                    date,
                    "SUCCEEDED",
                    "Deleted records from 'problems'."
                  )
                );
              })
              .catch((error: Error) => {
                event.reply(failed);
                writeLog(createLogFormat(date, "FAILED", error.message));
              });

            schema.forEach((raw: RawProblem) => {
              database(problems)
                .insert(createProblemRecord(raw))
                .then((res: Array<number>) => {
                  if (res[0] >= l) {
                    event.reply(succeeded);
                    createLogFormat(
                      date,
                      "SUCCEEDED",
                      "Inserted records into 'problems'."
                    );
                  }
                })
                .catch((error: Error) => {
                  event.reply(failed);
                  writeLog(createLogFormat(date, "FAILED", error.message));
                });
            });
          });
      });

      requestForProblems.on("error", (error: Error) => {
        event.reply(failed);
        writeLog(createLogFormat(date, "FAILED", error.message));
      });

      requestForProblems.end();
    } catch (error) {
      event.reply(failed);
      writeLog(createLogFormat(date, "FAILED", error.message));
    }
  });
};
