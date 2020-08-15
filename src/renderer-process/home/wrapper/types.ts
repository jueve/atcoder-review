type NotificationStatus = "error" | "warning" | "info" | "success";

export interface MessageWithNotification {
  open: boolean;
  status: NotificationStatus;
  message: string;
}
