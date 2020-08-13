export type FetchStatus = "STANDS_BY" | "UPDATING" | "SUCCEEDED" | "FAILED";
type FetchNotificationStatus = "error" | "warning" | "info" | "success";

export interface Compose {
  label: string;
  last_update: string;
  progress: FetchStatus;
  onClick: () => void;
}

export interface FetchNotification {
  open: boolean;
  status: FetchNotificationStatus;
  message: string;
}
