import { Fetch as FetchChannel } from "./channel-name";
import { FreeQueue as FreeQueueChannel } from "./channel-name";
import { DateQueue as DateQueueChannel } from "./channel-name";
import { Fetch } from "./Fetch";
import { FreeQueue } from "./FreeQueue";
import { DateQueue } from "./DateQueue";

const standByDatabaseOperations = () => {
  Fetch.updateUserSubmissions(
    "user_submissions",
    FetchChannel.UPDATE_USER_SUBMISSIONS,
    FetchChannel.UPDATE_USER_SUBMISSIONS_SUCCEEDED,
    FetchChannel.UPDATE_USER_SUBMISSIONS_FAILED
  );

  Fetch.updateProblems(
    "problems",
    FetchChannel.UPDATE_PROBLEMS,
    FetchChannel.UPDATE_PROBLEMS_SUCCEEDED,
    FetchChannel.UPDATE_PROBLEMS_FAILED
  );

  Fetch.updateProblemModels(
    "problem_models",
    FetchChannel.UPDATE_PROBLEM_MODELS,
    FetchChannel.UPDATE_PROBLEM_MODELS_SUCCEEDED,
    FetchChannel.UPDATE_PROBLEM_MODELS_FAILED
  );

  Fetch.updateContests(
    "contests",
    FetchChannel.UPDATE_CONTESTS,
    FetchChannel.UPDATE_CONTESTS_SUCCEEDED,
    FetchChannel.UPDATE_CONTESTS_FAILED
  );

  FreeQueue.getItem(
    "free_queue",
    FreeQueueChannel.GET_ITEM,
    FreeQueueChannel.GET_ITEM_SUCCEEDED,
    FreeQueueChannel.GET_ITEM_FAILED
  );

  FreeQueue.getItems(
    "free_queue",
    FreeQueueChannel.GET_ITEMS,
    FreeQueueChannel.GET_ITEMS_SUCCEEDED,
    FreeQueueChannel.GET_ITEMS_FAILED
  );

  FreeQueue.getCandidates(
    "problems",
    "contests",
    FreeQueueChannel.GET_CANDIDATES,
    FreeQueueChannel.GET_CANDIDATES_SUCCEEDED,
    FreeQueueChannel.GET_CANDIDATES_FAILED
  );

  FreeQueue.insertItems(
    "free_queue",
    FreeQueueChannel.INSERT_ITEMS,
    FreeQueueChannel.INSERT_ITEMS_SUCCEEDED,
    FreeQueueChannel.INSERT_ITEMS_FAILED
  );

  FreeQueue.deleteItems(
    "free_queue",
    FreeQueueChannel.DELETE_ITEMS,
    FreeQueueChannel.DELETE_ITEMS_SUCCEEDED,
    FreeQueueChannel.DELETE_ITEMS_FAILED
  );

  FreeQueue.reorderItems(
    "free_queue",
    FreeQueueChannel.REORDER_ITEMS,
    FreeQueueChannel.REORDER_ITEMS_SUCCEEDED,
    FreeQueueChannel.REORDER_ITEMS_FAILED
  );

  FreeQueue.changeItemDoneStatus(
    "free_queue",
    FreeQueueChannel.UPDATE_ITEM_DONE_STATUS,
    FreeQueueChannel.UPDATE_ITEM_DONE_STATUS_SUCCEEDED,
    FreeQueueChannel.UPDATE_ITEM_DONE_STATUS_FAILED
  );

  DateQueue.getDateQueueCandidates(
    DateQueueChannel.GET_CANDIDATES,
    DateQueueChannel.GET_CANDIDATES_SUCCEEDED,
    DateQueueChannel.GET_CANDIDATES_FAILED
  );

  FreeQueue.getProblemDifficulty(
    "problem_models",
    FreeQueueChannel.GET_PROBLEM_DIFFICULTY
  );

  FreeQueue.getProblemExperimentalStatus(
    "problem_models",
    FreeQueueChannel.GET_PROBLEM_EXPERIMENTAL_STATUS
  );
};

export default standByDatabaseOperations;
