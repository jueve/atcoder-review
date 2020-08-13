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
  const slope = raw.slope === undefined || raw.slope === null ? 0 : raw.slope;
  const intercept =
    raw.intercept === undefined || raw.intercept === null ? 0 : raw.intercept;
  const variance =
    raw.variance === undefined || raw.variance === null ? 0 : raw.variance;
  const difficulty =
    raw.difficulty === undefined || raw.difficulty === null
      ? 0
      : raw.difficulty;
  const discrimination =
    raw.discrimination === undefined || raw.discrimination === null
      ? 0
      : raw.discrimination;
  const irt_loglikelihood =
    raw.irt_loglikelihood === undefined || raw.irt_loglikelihood === null
      ? 0
      : raw.irt_loglikelihood;
  const irt_users =
    raw.irt_users === undefined || raw.irt_users === null ? 0 : raw.irt_users;
  const is_experimental =
    raw.is_experimental === undefined || raw.is_experimental === null
      ? false
      : raw.is_experimental;
  return {
    id: v4(),
    problem_id: key,
    slope: slope,
    intercept: intercept,
    variance: variance,
    difficulty: difficulty,
    discrimination: discrimination,
    irt_loglikelihood: irt_loglikelihood,
    irt_users: irt_users,
    is_experimental: is_experimental,
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
            const schema: Record<string, RawProblemModel> = JSON.parse(
              data.toString()
            );
            const l: number = Object.entries(schema).length;

            database(problemModels)
              .delete()
              .then((resp) => resp);

            for (const [key, value] of Object.entries(schema)) {
              database(problemModels)
                .insert(createProblemModelRecord(key, value))
                .then((res: Array<number>) => {
                  event.reply(succeeded, res[0], l);
                })
                .catch((_res) => event.reply(failed));
            }
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
