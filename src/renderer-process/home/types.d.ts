type NotificationStatus = "error" | "warning" | "info" | "success";

export interface NotificationWithMessage {
  open: boolean;
  status: NotificationStatus;
  message: string;
}
