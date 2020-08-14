import {
  getLog,
  GET_LOG,
  GET_LOG_SUCCEEDED,
  GET_LOG_FAILED,
} from "./update-database/getLog";
import {
  updateLog,
  UPDATE_LOG,
  UPDATE_LOG_SUCCEEDED,
  UPDATE_LOG_FAILED,
} from "./update-database/updateLog";

export const standByLogOperations = (): void => {
  getLog(GET_LOG, GET_LOG_SUCCEEDED, GET_LOG_FAILED);
  updateLog(UPDATE_LOG, UPDATE_LOG_SUCCEEDED, UPDATE_LOG_FAILED);
};
