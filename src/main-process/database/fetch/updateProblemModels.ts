import { TableName } from "../TableName";
import { ipcMain, net } from "electron";
import database from "../../../database";
import { v4 } from "uuid";
import { ProblemModel } from "../../../defines/ProblemModel";

type RawProblemModel = ProblemModel.RawProblemModel;
type ProblemModel = ProblemModel.ProblemModel;
type UpdateProblemModels =
  | "UPDATE_PROBLEM_MODELS"
  | "UPDATE_PROBLEM_MODELS_SUCCEEDED"
  | "UPDATE_PROBLEM_MODELS_FAILED";

export const UPDATE_PROBLEM_MODELS = "UPDATE_PROBLEM_MODELS";
export const UPDATE_PROBLEM_MODELS_SUCCEEDED =
  "UPDATE_PROBLEM_MODELS_SUCCEEDED";
export const UPDATE_PROBLEM_MODELS_FAILED = "UPDATE_PROBLEM_MODELS_FAILED";

const createProblemModelRecord = (
  key: string,
  raw: RawProblemModel
): ProblemModel => {
  return {
    id: v4(),
    problem_id: key,
    slope: raw.slope,
    intercept: raw.intercept,
    variance: raw.variance,
    difficulty: raw.difficulty,
    discrimination: raw.discrimination,
    irt_loglikelihood: raw.irt_loglikelihood,
    irt_users: raw.irt_users,
    is_experimental: raw.is_experimental,
  };
};

export const updateProblemModels = (
  problemModels: TableName,
  begin: UpdateProblemModels,
  succeeded: UpdateProblemModels,
  failed: UpdateProblemModels
): void => {
  ipcMain.on(begin, (event) => {
    try {
      const requestForProblemModels = net.request({
        method: "GET",
        protocol: "https:",
        hostname: "kenkoooo.com",
        path: "/atcoder/resources/problem-models.json",
      });
      const chunks: Array<Buffer> = [];
      requestForProblemModels.on("response", (response) => {
        response
          .on("data", (chunk) => {
            chunks.push(chunk);
          })
          .on("end", () => {
            const data: Buffer = Buffer.concat(chunks);
            const schema = JSON.parse(data.toString());

            database(problemModels)
              .delete()
              .then((resp) => resp);

            for (const [key, value] of Object.entries(schema)) {
              database(problemModels)
                .insert(createProblemModelRecord(key, value))
                .then((res) => res)
                .catch((_res) => event.reply(failed));
            }

            event.reply(succeeded);
          });
      });

      requestForProblemModels.on("error", (e) => {
        event.reply(failed);
        console.log(e);
      });

      requestForProblemModels.end();
    } catch (e) {
      console.log(e);
      event.reply(failed);
    }
  });
};
