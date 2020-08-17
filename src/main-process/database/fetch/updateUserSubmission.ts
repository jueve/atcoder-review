import { TableName } from "../TableName";
import { ipcMain, net } from "electron";
import { Set } from "immutable";
import database from "../../../database";
import { UserSubmission } from "../../../defines/UserSubmission";
import { v4 } from "uuid";
import moment from "moment";
import { readFileSync } from "fs";
import { CONFIG } from "../../constants";
import { resolvePath } from "../../resolvePath";

type RawUserSubmission = UserSubmission.RawUserSubmission;
type UserSubmission = UserSubmission.UserSubmission;
type UpdateUserSubmissions =
  | "UPDATE_USER_SUBMISSIONS"
  | "UPDATE_USER_SUBMISSIONS_SUCCEEDED"
  | "UPDATE_USER_SUBMISSIONS_FAILED";

export const UPDATE_USER_SUBMISSIONS = "UPDATE_USER_SUBMISSIONS";
export const UPDATE_USER_SUBMISSIONS_SUCCEEDED =
  "UPDATE_USER_SUBMISSIONS_SUCCEEDED";
export const UPDATE_USER_SUBMISSIONS_FAILED = "UPDATE_USER_SUBMISSIONS_FAILED";

const createUserSubmissionRecord = (raw: RawUserSubmission): UserSubmission => {
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

const isUnder = (epochSecond: number, days: number): boolean => {
  const d = new Date().getTime();
  const now = moment.unix(d);
  return moment.duration(now.diff(epochSecond)).days() <= days;
};

const getUserId = (): string => {
  const config = resolvePath(CONFIG);
  const data: string = readFileSync(config, { encoding: "utf-8" });
  const schema = JSON.parse(data);

  if (
    schema !== null &&
    schema !== undefined &&
    schema.user_id !== null &&
    schema.user_id !== undefined
  ) {
    return schema.user_id;
  } else {
    throw new Error("Can't resolve user id from config file.");
  }
};

export const updateUserSubmissions = (
  userSubmission: TableName,
  begin: UpdateUserSubmissions,
  succeeded: UpdateUserSubmissions,
  failed: UpdateUserSubmissions
): void => {
  ipcMain.on(begin, (event) => {
    try {
      const userId = getUserId();
      const requestForUserSubmission = net.request({
        method: "GET",
        protocol: "https:",
        hostname: "kenkoooo.com",
        path: `/atcoder/atcoder-api/results?user=${userId}`,
      });
      const chunks: Array<Buffer> = [];
      requestForUserSubmission.on("response", (response) => {
        response
          .on("data", (chunk) => {
            chunks.push(chunk);
          })
          .on("end", () => {
            let insertedProblem = Set<string>();
            const data: Buffer = Buffer.concat(chunks);
            const schema: Array<RawUserSubmission> = JSON.parse(
              data.toString()
            );
            const rows = Array<UserSubmission>(0);

            schema.sort((a: RawUserSubmission, b: RawUserSubmission) => {
              return b.id - a.id;
            });

            database(userSubmission)
              .delete()
              .then((resp) => resp);

            schema.forEach((raw: RawUserSubmission) => {
              if (
                isUnder(raw.epoch_second, 365) &&
                !insertedProblem.has(raw.problem_id)
              ) {
                rows.push(createUserSubmissionRecord(raw));
                insertedProblem = insertedProblem.add(raw.problem_id);
              }
            });

            const l = rows.length;
            rows.forEach((r) => {
              database(userSubmission)
                .insert(r)
                .then((res: Array<number>) => {
                  if (res[0] >= l) {
                    event.reply(succeeded);
                  }
                })
                .catch((_res) => event.reply(failed));
            });
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
