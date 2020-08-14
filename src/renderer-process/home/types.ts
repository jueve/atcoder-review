export type Fetch = "STANDS_BY" | "UPDATING" | "SUCCEEDED" | "FAILED";
type Notification = "error" | "warning" | "info" | "success";

export interface FetchStatus {
  lastUpdate: string;
  progress: Fetch;
}

export interface NotificationStatus {
  open: boolean;
  status: Notification;
  message: string;
}
