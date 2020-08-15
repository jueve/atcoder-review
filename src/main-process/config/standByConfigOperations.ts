import {
  getUserId,
  GET_USER_ID,
  GET_USER_ID_SUCCEEDED,
  GET_USER_ID_FAILED,
} from "./user-id/getUserId";
import {
  updateUserId,
  UPDATE_USER_ID,
  UPDATE_USER_ID_SUCCEEDED,
  UPDATE_USER_ID_FAILED,
} from "./user-id/updateUserId";

export const standByConfigOperations = (): void => {
  getUserId(GET_USER_ID, GET_USER_ID_SUCCEEDED, GET_USER_ID_FAILED);
  updateUserId(UPDATE_USER_ID, UPDATE_USER_ID_SUCCEEDED, UPDATE_USER_ID_FAILED);
};
