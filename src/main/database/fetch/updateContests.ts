import { TableName } from "../TableName";
import { ipcMain, net } from "electron";
import { database } from "../../database";
import { Contest } from "../../../defines/Contest";
import { v4 } from "uuid";
import { writeLog } from "../../log/database-operations/writeLog";
import { createLogFormat } from "../../log/database-operations/createLogFormat";
import moment from "moment";

type RawContest = Contest.RawContest;
type Contest = Contest.Contest;
type UpdateContests =
  | "UPDATE_CONTESTS"
  | "UPDATE_CONTESTS_SUCCEEDED"
  | "UPDATE_CONTESTS_FAILED";

export const UPDATE_CONTESTS = "UPDATE_CONTESTS";
export const UPDATE_CONTESTS_SUCCEEDED = "UPDATE_CONTESTS_SUCCEEDED";
export const UPDATE_CONTESTS_FAILED = "UPDATE_CONTESTS_FAILED";

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

export const updateContests = (
  contests: TableName,
  begin: UpdateContests,
  succeeded: UpdateContests,
  failed: UpdateContests
): void => {
  ipcMain.on(begin, (event) => {
    const date: string = moment().local().format("YYYY-MM-DD HH:mm:ss");
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
            const schema: Array<RawContest> = JSON.parse(data.toString());
            const l: number = schema.length;

            database(contests)
              .delete()
              .then((_res) => {
                writeLog(
                  createLogFormat(
                    date,
                    "SUCCEEDED",
                    "Deleted records from 'contests'."
                  )
                );
              })
              .catch((error: Error) => {
                event.reply(failed);
                writeLog(createLogFormat(date, "FAILED", error.message));
              });

            schema.forEach((raw: RawContest) => {
              database(contests)
                .insert(createContestRecord(raw))
                .then((res: Array<number>) => {
                  if (res[0] >= l) {
                    event.reply(succeeded);
                    writeLog(
                      createLogFormat(
                        date,
                        "SUCCEEDED",
                        "Inserted records into 'contests'."
                      )
                    );
                  }
                })
                .catch((error: Error) => {
                  event.reply(failed);
                  writeLog(createLogFormat(date, "FAILED", error.message));
                });
            });
          })
          .on("error", (error: Error) => {
            event.reply(failed);
            writeLog(createLogFormat(date, "FAILED", error.message));
          });
      });

      requestForContests.on("error", (error: Error) => {
        event.reply(failed);
        writeLog(createLogFormat(date, "FAILED", error.message));
      });

      requestForContests.end();
    } catch (error) {
      event.reply(failed);
      writeLog(createLogFormat(date, "FAILED", error.message));
    }
  });
};
