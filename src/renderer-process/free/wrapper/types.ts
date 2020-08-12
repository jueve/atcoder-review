import { Item } from "../../../defines/Item";
import { Candidate } from "../../../defines/Candidate";

export type FQItem = Item.FreeQueueItem;
export type FQCandidate = Candidate.FreeQueueCandidate;

type SnackBarStatus = "error" | "warning" | "info" | "success";

export interface SnackbarAction {
  status: SnackBarStatus;
  open: boolean;
  message: string;
}

type KindOfSort =
  | "INSERT_DATE"
  | "CONTEST_DATE"
  | "DIFFICULTY"
  | "DONE_UNDONE"
  | "DND"
  | "RESET";

type OrderOfSort = "ASCENDANT" | "DESCENDANT";

export interface SortAction {
  kind?: KindOfSort;
  order?: OrderOfSort;
  startIndex?: OrderOfSort;
  sortIndex?: OrderOfSort;
}
