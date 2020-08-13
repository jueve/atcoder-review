import {
  getAllCandidates,
  GET_ALL_CANDIDATES,
  GET_ALL_CANDIDATES_SUCCEEDED,
  GET_ALL_CANDIDATES_FAILED,
} from "./getAllCandidates";
import {
  getAllItems,
  GET_ALL_ITEMS,
  GET_ALL_ITEMS_SUCCEEDED,
  GET_ALL_ITEMS_FAILED,
} from "./getAllItems";
import {
  getSingleItem,
  GET_SINGLE_ITEM,
  GET_SINGLE_ITEM_SUCCEEDED,
  GET_SINGLE_ITEM_FAILED,
} from "./getSingleItem";
import {
  insertItems,
  INSERT_ITEMS,
  INSERT_ITEMS_SUCCEEDED,
  INSERT_ITEMS_FAILED,
} from "./insertItems";
import {
  deleteItems,
  DELETE_ITEMS,
  DELETE_ITEMS_SUCCEEDED,
  DELETE_ITEMS_FAILED,
} from "./deleteItems";
import {
  updateDoneStatus,
  UPDATE_DONE_STATUS,
  UPDATE_DONE_STATUS_SUCCEEDED,
  UPDATE_DONE_STATUS_FAILED,
} from "./updateDoneStatus";
import {
  getDifficulty,
  GET_DIFFICULTY,
  GET_DIFFICULTY_SUCCEEDED,
  GET_DIFFICULTY_FAILED,
} from "./getDifficulty";
import {
  getExperimentalStatus,
  GET_EXPERIMENTAL_STATUS,
  GET_EXPERIMENTAL_STATUS_SUCCEEDED,
  GET_EXPERIMENTAL_STATUS_FAILED,
} from "./getExperimentalStatus";

export const ready = (): void => {
  getAllCandidates(
    "problems",
    "contests",
    GET_ALL_CANDIDATES,
    GET_ALL_CANDIDATES_SUCCEEDED,
    GET_ALL_CANDIDATES_FAILED
  );
  getAllItems(
    "free_queue",
    GET_ALL_ITEMS,
    GET_ALL_ITEMS_SUCCEEDED,
    GET_ALL_ITEMS_FAILED
  );
  getSingleItem(
    "free_queue",
    GET_SINGLE_ITEM,
    GET_SINGLE_ITEM_SUCCEEDED,
    GET_SINGLE_ITEM_FAILED
  );
  insertItems(
    "free_queue",
    INSERT_ITEMS,
    INSERT_ITEMS_SUCCEEDED,
    INSERT_ITEMS_FAILED
  );
  deleteItems(
    "free_queue",
    DELETE_ITEMS,
    DELETE_ITEMS_SUCCEEDED,
    DELETE_ITEMS_FAILED
  );
  updateDoneStatus(
    "free_queue",
    UPDATE_DONE_STATUS,
    UPDATE_DONE_STATUS_SUCCEEDED,
    UPDATE_DONE_STATUS_FAILED
  );
  getDifficulty(
    "problem_models",
    GET_DIFFICULTY,
    GET_DIFFICULTY_SUCCEEDED,
    GET_DIFFICULTY_FAILED
  );
  getExperimentalStatus(
    "problem_models",
    GET_EXPERIMENTAL_STATUS,
    GET_EXPERIMENTAL_STATUS_SUCCEEDED,
    GET_EXPERIMENTAL_STATUS_FAILED
  );
};
