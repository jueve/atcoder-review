import { Item } from "../../defines/Item";
import { ipcMain } from "electron";
import database from "../../database";
import { Contest } from "../../defines/Contest";
import { Problem } from "../../defines/Problem";
import { Candidate } from "../../defines/Candidate";
import { TableName } from "./TableName";

export namespace FreeQueue {
  interface ExperimentalStatus {
    is_experimental: boolean | undefined | null;
  }
  interface Difficulty {
    difficulty: number | undefined | null;
  }
  type Contest = Contest.Contest;
  type Problem = Problem.Problem;
  type FreeQueueItem = Item.FreeQueueItem;
  type FreeQueueCandidate = Candidate.FreeQueueCandidate;

  type Dictionary = Record<string, Contest>;

  type GetFreeQueueItems =
    | "GET_FREE_QUEUE_ITEMS"
    | "GET_FREE_QUEUE_ITEMS_SUCCEEDED"
    | "GET_FREE_QUEUE_ITEMS_FAILED";

  type GetFreeQueueItem =
    | "GET_FREE_QUEUE_ITEM"
    | "GET_FREE_QUEUE_ITEM_SUCCEEDED"
    | "GET_FREE_QUEUE_ITEM_FAILED";

  type GetFreeQueueCandidate =
    | "GET_FREE_QUEUE_CANDIDATES"
    | "GET_FREE_QUEUE_CANDIDATES_SUCCEEDED"
    | "GET_FREE_QUEUE_CANDIDATES_FAILED";

  type InsertFreeQueueItems =
    | "INSERT_FREE_QUEUE_ITEMS"
    | "INSERT_FREE_QUEUE_ITEMS_SUCCEEDED"
    | "INSERT_FREE_QUEUE_ITEMS_FAILED";

  type DeleteFreeQueueItems =
    | "DELETE_FREE_QUEUE_ITEMS"
    | "DELETE_FREE_QUEUE_ITEMS_SUCCEEDED"
    | "DELETE_FREE_QUEUE_ITEMS_FAILED";

  type ReorderFreeQueueItems =
    | "REORDER_FREE_QUEUE_ITEMS"
    | "REORDER_FREE_QUEUE_ITEMS_SUCCEEDED"
    | "REORDER_FREE_QUEUE_ITEMS_FAILED";

  type UpdateFreeQueueItemDoneStatus =
    | "UPDATE_FREE_QUEUE_ITEM_DONE_STATUS"
    | "UPDATE_FREE_QUEUE_ITEM_DONE_STATUS_SUCCEEDED"
    | "UPDATE_FREE_QUEUE_ITEM_DONE_STATUS_FAILED";

  type GetProblemExperimentalStatus = "GET_PROBLEM_EXPERIMENTAL_STATUS";

  type GetProblemDifficulty = "GET_PROBLEM_DIFFICULTY";

  export const getCandidates = (
    problems: TableName,
    contests: TableName,
    begin: GetFreeQueueCandidate,
    succeeded: GetFreeQueueCandidate,
    failed: GetFreeQueueCandidate
  ): void => {
    ipcMain.on(begin, (event) => {
      try {
        database(problems)
          .select()
          .then((ps: Array<Problem>) => {
            database(contests)
              .select()
              .then((cs: Array<Contest>) => {
                const dict: Dictionary = {};
                const fqcs: Array<FreeQueueCandidate> = [];

                cs.forEach((c: Contest) => {
                  dict[c.contest_id] = c;
                });

                ps.forEach((p: Problem) => {
                  fqcs.push({
                    id: p.id,
                    start_epoch_second: dict[p.contest_id].start_epoch_second,
                    problem_id: p.problem_id,
                    contest_id: p.contest_id,
                    problem_title: p.problem_title,
                    contest_title: dict[p.contest_id].contest_title,
                    rate_change: dict[p.contest_id].rate_change,
                  });
                });

                event.reply(succeeded, fqcs);
              })
              .catch((_res) => {
                console.log(_res);
                event.reply(failed, []);
              });
          })
          .catch((_res) => {
            console.log(_res);
            event.reply(failed, []);
          });
      } catch (e) {
        event.reply(failed, []);
        console.log(e);
      }
    });
  };

  export const getItem = (
    tableName: TableName,
    begin: GetFreeQueueItem,
    succeeded: GetFreeQueueItem,
    failed: GetFreeQueueItem
  ): void => {
    ipcMain.on(begin, (event, id: string) => {
      try {
        database(tableName)
          .select()
          .where({ id: id })
          .then((fqis) => {
            event.returnValue = fqis;
            event.reply(succeeded, fqis);
          })
          .catch((_res) => {
            event.returnValue = [];
            event.reply(failed, []);
          });
      } catch (e) {
        event.returnValue = [];
        event.reply(failed, []);
        console.log(e);
      }
    });
  };

  export const getItems = (
    tableName: TableName,
    begin: GetFreeQueueItems,
    succeeded: GetFreeQueueItems,
    failed: GetFreeQueueItems
  ): void => {
    ipcMain.on(begin, (event) => {
      try {
        database(tableName)
          .select()
          .then((fqis) => {
            const rev = fqis.reverse();
            event.returnValue = rev;
            event.reply(succeeded, rev);
          })
          .catch((_res) => {
            event.returnValue = [];
            event.reply(failed, []);
          });
      } catch (e) {
        event.returnValue = [];
        event.reply(failed, []);
        console.log(e);
      }
    });
  };

  export const insertItems = (
    tableName: TableName,
    begin: InsertFreeQueueItems,
    succeeded: InsertFreeQueueItems,
    failed: InsertFreeQueueItems
  ): void => {
    ipcMain.on(begin, (event, fqis: Array<FreeQueueItem>): void => {
      try {
        fqis.forEach((fqi) => {
          database(tableName)
            .insert(fqi)
            .then((res) => res)
            .catch((res) => {
              event.reply(failed);
              console.log(res);
            });
        });
        event.reply(succeeded);
      } catch (e) {
        event.reply(failed);
        console.log(e);
      }
    });
  };

  export const deleteItems = (
    tableName: TableName,
    begin: DeleteFreeQueueItems,
    succeeded: DeleteFreeQueueItems,
    failed: DeleteFreeQueueItems
  ): void => {
    ipcMain.on(begin, (event, items: Array<FreeQueueItem>) => {
      try {
        items.forEach((fqi) => {
          database(tableName)
            .where("id", fqi.id)
            .del()
            .then((res) => res);
        });
        event.reply(succeeded);
      } catch (e) {
        event.reply(failed);
        console.log(e);
      }
    });
  };

  export const reorderItems = (
    tableName: TableName,
    begin: ReorderFreeQueueItems,
    succeeded: ReorderFreeQueueItems,
    failed: ReorderFreeQueueItems
  ): void => {
    ipcMain.on(begin, (event, items: Array<FreeQueueItem>): void => {
      try {
        database(tableName)
          .delete()
          .then((res) => res);
        items.reverse().forEach((item) => {
          database(tableName)
            .insert(item)
            .then((res) => res);
        });
        event.reply(succeeded);
      } catch (e) {
        event.reply(failed);
        console.log(e);
      }
    });
  };

  export const changeItemDoneStatus = (
    tableName: TableName,
    begin: UpdateFreeQueueItemDoneStatus,
    succeeded: UpdateFreeQueueItemDoneStatus,
    failed: UpdateFreeQueueItemDoneStatus
  ): void => {
    ipcMain.on(begin, (event, status: boolean, fqi: FreeQueueItem): void => {
      try {
        database(tableName)
          .where({ id: fqi.id })
          .update({ is_done: status })
          .then((res) => res);
        event.reply(succeeded);
      } catch (e) {
        event.reply(failed);
        console.log(e);
      }
    });
  };

  export const getProblemExperimentalStatus = (
    tableName: TableName,
    begin: GetProblemExperimentalStatus
  ): void => {
    ipcMain.on(begin, (event, fqc: FreeQueueCandidate) => {
      try {
        database(tableName)
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
          })
          .catch((_res) => (event.returnValue = false));
      } catch (e) {
        event.returnValue = false;
        console.log(e);
      }
    });
  };

  export const getProblemDifficulty = (
    tableName: TableName,
    begin: GetProblemDifficulty
  ): void => {
    ipcMain.on(begin, (event, fqc: FreeQueueCandidate) => {
      try {
        database(tableName)
          .select("difficulty")
          .where({ problem_id: fqc.problem_id })
          .then((rows: Array<Difficulty>) => {
            if (
              rows === undefined ||
              rows === null ||
              rows.length === 0 ||
              rows[0].difficulty === null
            ) {
              event.returnValue = Number.MIN_SAFE_INTEGER;
            } else {
              event.returnValue = Math.floor(Math.max(rows[0].difficulty, 0));
            }
          })
          .catch((_res) => (event.returnValue = Number.MIN_SAFE_INTEGER));
      } catch (e) {
        event.returnValue = Number.MIN_SAFE_INTEGER;
        console.log(e);
      }
    });
  };
}
