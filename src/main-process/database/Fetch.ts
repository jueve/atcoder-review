import { ipcMain, net } from "electron";
import database from "../../database";
import { UserSubmission } from "../../defines/UserSubmission";
import moment from "moment";
import { v4 } from "uuid";
import { Set } from "immutable";
import { TableName } from "./TableName";
import { Problem } from "../../defines/Problem";
import { ProblemModel } from "../../defines/ProblemModel";
import { Contest } from "../../defines/Contest";

export namespace Fetch {
  type RawUserSubmission = UserSubmission.RawUserSubmission;
  type RawContest = Contest.RawContest;
  type RawProblem = Problem.RawProblem;
  type RawProblemModel = ProblemModel.RawProblemModel;

  type UserSubmission = UserSubmission.UserSubmission;
  type Contest = Contest.Contest;
  type Problem = Problem.Problem;
  type ProblemModel = ProblemModel.ProblemModel;

  type problemId = string;

  type UpdateUserSubmissions =
    | "UPDATE_USER_SUBMISSIONS"
    | "UPDATE_USER_SUBMISSIONS_SUCCEEDED"
    | "UPDATE_USER_SUBMISSIONS_FAILED";
  type UpdateContests =
    | "UPDATE_CONTESTS"
    | "UPDATE_CONTESTS_SUCCEEDED"
    | "UPDATE_CONTESTS_FAILED";
  type UpdateProblems =
    | "UPDATE_PROBLEMS"
    | "UPDATE_PROBLEMS_SUCCEEDED"
    | "UPDATE_PROBLEMS_FAILED";
  type UpdateProblemModels =
    | "UPDATE_PROBLEM_MODELS"
    | "UPDATE_PROBLEM_MODELS_SUCCEEDED"
    | "UPDATE_PROBLEM_MODELS_FAILED";

  const isUnder = (epochSecond: number, days: number): boolean => {
    const d = new Date().getTime();
    const now = moment.unix(d);
    return moment.duration(now.diff(epochSecond)).days() <= days;
  };

  const createProblemRecord = (raw: RawProblem): Problem => {
    return {
      id: v4(),
      problem_id: raw.id,
      contest_id: raw.contest_id,
      problem_title: raw.title,
    };
  };

  const createUserSubmissionRecord = (
    raw: RawUserSubmission
  ): UserSubmission => {
    return {
      id: v4(),
      submission_id: raw.id,
      epoch_second: raw.epoch_second,
      problem_id: raw.problem_id,
      contest_id: raw.contest_id,
      user_id: raw.user_id,
      language: raw.language,
      point: raw.point,
      length: raw.length,
      result: raw.result,
      execution_time: raw.execution_time,
    };
  };

  const createContestRecord = (raw: RawContest): Contest => {
    return {
      id: v4(),
      start_epoch_second: raw.start_epoch_second,
      duration_second: raw.duration_second,
      contest_id: raw.id,
      contest_title: raw.title,
      rate_change: raw.rate_change,
    };
  };

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

  export const updateUserSubmissions = (
    tableName: TableName,
    begin: UpdateUserSubmissions,
    succeeded: UpdateUserSubmissions,
    failed: UpdateUserSubmissions
  ): void => {
    ipcMain.on(begin, (event) => {
      try {
        const requestForUserSubmission = net.request({
          method: "GET",
          protocol: "https:",
          hostname: "kenkoooo.com",
          path: "/atcoder/atcoder-api/results?user=cashitsuki",
        });
        const chunks: Array<Buffer> = [];
        requestForUserSubmission.on("response", (response) => {
          response
            .on("data", (chunk) => {
              chunks.push(chunk);
            })
            .on("end", () => {
              let insertedProblem = Set<problemId>();
              const data: Buffer = Buffer.concat(chunks);
              const schema: Array<RawUserSubmission> = JSON.parse(
                data.toString()
              );

              schema.sort((a: RawUserSubmission, b: RawUserSubmission) => {
                return b.id - a.id;
              });

              database(tableName)
                .delete()
                .then((resp) => resp);

              schema.forEach((raw: RawUserSubmission) => {
                if (
                  isUnder(raw.epoch_second, 365) &&
                  !insertedProblem.has(raw.problem_id)
                ) {
                  database(tableName)
                    .insert(createUserSubmissionRecord(raw))
                    .then((res) => res)
                    .catch((_res) => event.reply(failed));

                  insertedProblem = insertedProblem.add(raw.problem_id);
                }
              });

              event.reply(succeeded);
            });
        });

        requestForUserSubmission.on("error", (e) => {
          event.reply(failed);
          console.log(e);
        });

        requestForUserSubmission.end();
      } catch (e) {
        console.log(e);
        event.reply(failed);
      }
    });
  };

  export const updateContests = (
    tableName: TableName,
    begin: UpdateContests,
    succeeded: UpdateContests,
    failed: UpdateContests
  ): void => {
    ipcMain.on(begin, (event) => {
      try {
        const requestForContests = net.request({
          method: "GET",
          protocol: "https:",
          hostname: "kenkoooo.com",
          path: "/atcoder/resources/contests.json",
        });
        const chunks: Array<Buffer> = [];
        requestForContests.on("response", (response) => {
          response
            .on("data", (chunk) => {
              chunks.push(chunk);
            })
            .on("end", () => {
              const data: Buffer = Buffer.concat(chunks);
              const schema = JSON.parse(data.toString());

              database(tableName)
                .delete()
                .then((_res) => _res);

              schema.forEach((raw: RawContest) => {
                database(tableName)
                  .insert(createContestRecord(raw))
                  .then((res) => event.reply(succeeded, res))
                  .catch((_res) => event.reply(failed));
              });

              event.reply(succeeded);
            })
            .on("error", (e: any) => {
              event.reply(failed);
              console.log(e);
            });
        });

        requestForContests.on("error", (e) => {
          event.reply(failed);
          console.log(e);
        });

        requestForContests.end();
      } catch (e) {
        event.reply(failed);
      }
    });
  };

  export const updateProblems = (
    tableName: TableName,
    begin: UpdateProblems,
    succeeded: UpdateProblems,
    failed: UpdateProblems
  ): void => {
    ipcMain.on(begin, (event) => {
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

              database(tableName)
                .delete()
                .then((_res) => _res);

              schema.forEach((raw: RawProblem) => {
                database(tableName)
                  .insert(createProblemRecord(raw))
                  .then((res) => event.reply(succeeded, res))
                  .catch((_res) => event.reply(failed));
              });

              event.reply(succeeded);
            });
        });

        requestForProblems.on("error", (e) => {
          event.reply(failed);
          console.log(e);
        });

        requestForProblems.end();
      } catch (e) {
        console.log(e);
        event.reply(failed);
      }
    });
  };

  export const updateProblemModels = (
    tableName: TableName,
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

              database(tableName)
                .delete()
                .then((resp) => resp);

              for (const [key, value] of Object.entries(schema)) {
                database(tableName)
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
}
