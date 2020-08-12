export namespace Fetch {
  export const UPDATE_PROBLEMS = "UPDATE_PROBLEMS";
  export const UPDATE_PROBLEMS_SUCCEEDED = "UPDATE_PROBLEMS_SUCCEEDED";
  export const UPDATE_PROBLEMS_FAILED = "UPDATE_PROBLEMS_FAILED";

  export const UPDATE_PROBLEM_MODELS = "UPDATE_PROBLEM_MODELS";
  export const UPDATE_PROBLEM_MODELS_SUCCEEDED =
    "UPDATE_PROBLEM_MODELS_SUCCEEDED";
  export const UPDATE_PROBLEM_MODELS_FAILED = "UPDATE_PROBLEM_MODELS_FAILED";

  export const UPDATE_USER_SUBMISSIONS = "UPDATE_USER_SUBMISSIONS";
  export const UPDATE_USER_SUBMISSIONS_SUCCEEDED =
    "UPDATE_USER_SUBMISSIONS_SUCCEEDED";
  export const UPDATE_USER_SUBMISSIONS_FAILED =
    "UPDATE_USER_SUBMISSIONS_FAILED";

  export const UPDATE_CONTESTS = "UPDATE_CONTESTS";
  export const UPDATE_CONTESTS_SUCCEEDED = "UPDATE_CONTESTS_SUCCEEDED";
  export const UPDATE_CONTESTS_FAILED = "UPDATE_CONTESTS_FAILED";
}

export namespace FreeQueue {
  export const GET_ITEMS = "GET_FREE_QUEUE_ITEMS";
  export const GET_ITEMS_SUCCEEDED = "GET_FREE_QUEUE_ITEMS_SUCCEEDED";
  export const GET_ITEMS_FAILED = "GET_FREE_QUEUE_ITEMS_FAILED";

  export const GET_ITEM = "GET_FREE_QUEUE_ITEM";
  export const GET_ITEM_SUCCEEDED = "GET_FREE_QUEUE_ITEM_SUCCEEDED";
  export const GET_ITEM_FAILED = "GET_FREE_QUEUE_ITEM_FAILED";

  export const GET_CANDIDATES = "GET_FREE_QUEUE_CANDIDATES";
  export const GET_CANDIDATES_SUCCEEDED = "GET_FREE_QUEUE_CANDIDATES_SUCCEEDED";
  export const GET_CANDIDATES_FAILED = "GET_FREE_QUEUE_CANDIDATES_FAILED";

  export const INSERT_ITEMS = "INSERT_FREE_QUEUE_ITEMS";
  export const INSERT_ITEMS_SUCCEEDED = "INSERT_FREE_QUEUE_ITEMS_SUCCEEDED";
  export const INSERT_ITEMS_FAILED = "INSERT_FREE_QUEUE_ITEMS_FAILED";

  export const DELETE_ITEMS = "DELETE_FREE_QUEUE_ITEMS";
  export const DELETE_ITEMS_SUCCEEDED = "DELETE_FREE_QUEUE_ITEMS_SUCCEEDED";
  export const DELETE_ITEMS_FAILED = "DELETE_FREE_QUEUE_ITEMS_FAILED";

  export const REORDER_ITEMS = "REORDER_FREE_QUEUE_ITEMS";
  export const REORDER_ITEMS_SUCCEEDED = "REORDER_FREE_QUEUE_ITEMS_SUCCEEDED";
  export const REORDER_ITEMS_FAILED = "REORDER_FREE_QUEUE_ITEMS_FAILED";

  export const UPDATE_ITEM_DONE_STATUS = "UPDATE_FREE_QUEUE_ITEM_DONE_STATUS";
  export const UPDATE_ITEM_DONE_STATUS_SUCCEEDED =
    "UPDATE_FREE_QUEUE_ITEM_DONE_STATUS_SUCCEEDED";
  export const UPDATE_ITEM_DONE_STATUS_FAILED =
    "UPDATE_FREE_QUEUE_ITEM_DONE_STATUS_FAILED";

  export const GET_PROBLEM_DIFFICULTY = "GET_PROBLEM_DIFFICULTY";

  export const GET_PROBLEM_EXPERIMENTAL_STATUS =
    "GET_PROBLEM_EXPERIMENTAL_STATUS";
}

export namespace DateQueue {
  // date queue
  export const GET_CANDIDATES = "GET_DATE_QUEUE_CANDIDATES";
  export const GET_CANDIDATES_SUCCEEDED = "GET_DATE_QUEUE_CANDIDATES_SUCCEEDED";
  export const GET_CANDIDATES_FAILED = "GET_DATE_QUEUE_CANDIDATES_FAILED";
}
