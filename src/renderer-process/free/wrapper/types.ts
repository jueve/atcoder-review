import { Item } from "../../../defines/Item";
import { Candidate } from "../../../defines/Candidate";

export type FQItem = Item.FreeQueueItem;
export type FQCandidate = Candidate.FreeQueueCandidate;

type NotificationStatus = "error" | "warning" | "info" | "success";

export interface NotificationWithMessage {
  open: boolean;
  status: NotificationStatus;
  message: string;
}
