import { ipcMain } from "electron";
import database from "../../database";
import { UserSubmission } from "../../defines/UserSubmission";
import { Candidate } from "../../defines/Candidate";
import { Set } from "immutable";

export namespace DateQueue {
  type UserSubmission = UserSubmission.UserSubmission;
  type DateQueueCandidate = Candidate.DateQueueCandidate;
  type GetDateQueueCandidate =
    | "GET_DATE_QUEUE_CANDIDATES"
    | "GET_DATE_QUEUE_CANDIDATES_SUCCEEDED"
    | "GET_DATE_QUEUE_CANDIDATES_FAILED";

  export const getDateQueueCandidates = (
    begin: GetDateQueueCandidate,
    succeeded: GetDateQueueCandidate,
    failed: GetDateQueueCandidate
  ): void => {
    ipcMain.on(begin, (event) => {
      try {
        const tableName = "user_submissions";
        database(tableName)
          .select()
          .then((items) => {
            const arr: Array<DateQueueCandidate> = items.map(
              (sub: UserSubmission) => ({
                id: sub.id,
                epoch_second: sub.epoch_second,
              })
            );
            const fixedArr: Array<DateQueueCandidate> = Set.of(
              ...arr
            ).toArray();
            event.reply(succeeded, fixedArr);
          })
          .catch((_res) => event.reply(failed, []));
      } catch (e) {
        event.reply(failed, []);
        console.log(e);
      }
    });
  };
}
