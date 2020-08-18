type Status = "STANDS_BY" | "CHECKING" | "SUCCEEDED" | "FAILED";
type Destination =
  | "BASE_DIRECTORY"
  | "CONFIG_FILE"
  | "LOG_FILE"
  | "DATABASE_UPDATE_LOG_FILE"
  | "DATABASE_TABLES";

interface StatusWithMessage {
  status: Status;
  message: string;
}

export interface Initialization {
  baseDirectory: StatusWithMessage;
  configFile: StatusWithMessage;
  logFile: StatusWithMessage;
  databaseUpdateLogFile: StatusWithMessage;
  databaseTables: StatusWithMessage;
}

export interface ActionOfInitialization {
  destination: Destination;
  status: Status;
  message: string;
}
