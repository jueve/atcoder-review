import { TableName } from "../TableName";
import { ipcMain, net } from "electron";
import database from "../../database";
import { Contest } from "../../../defines/Contest";
import { v4 } from "uuid";

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
              .then((_res) => _res);

            schema.forEach((raw: RawContest) => {
              database(contests)
                .insert(createContestRecord(raw))
                .then((res: Array<number>) => {
                  if (res[0] >= l) {
                    event.reply(succeeded);
                  }
                })
                .catch((_res) => event.reply(failed));
            });
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
