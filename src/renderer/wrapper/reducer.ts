import { ActionOfInitialization, Initialization } from "./types";

export const reducer = (
  state: Initialization,
  action: ActionOfInitialization
): Initialization => {
  switch (action.destination) {
    case "BASE_DIRECTORY":
      return {
        ...state,
        baseDirectory: { status: action.status, message: action.message },
      };
    case "CONFIG_FILE":
      return {
        ...state,
        configFile: { status: action.status, message: action.message },
      };
    case "LOG_FILE":
      return {
        ...state,
        logFile: { status: action.status, message: action.message },
      };
    case "DATABASE_UPDATE_LOG_FILE":
      return {
        ...state,
        databaseUpdateLogFile: {
          status: action.status,
          message: action.message,
        },
      };
    case "DATABASE_TABLES":
      return {
        ...state,
        databaseTables: { status: action.status, message: action.message },
      };
    default:
      return state;
  }
};
