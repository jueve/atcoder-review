export type Status = "STANDS_BY" | "UPDATING" | "SUCCEEDED" | "FAILED";
type NotificationStatus = "error" | "warning" | "info" | "success";

export interface FetchStatus {
  lastUpdate: string;
  progress: Status;
}

export interface Notification {
  open: boolean;
  status: NotificationStatus;
  message: string;
}
