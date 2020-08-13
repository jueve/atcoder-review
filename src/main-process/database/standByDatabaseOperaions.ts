import { Fetch as FetchChannel } from "./channel-name";
import { DateQueue as DateQueueChannel } from "./channel-name";
import { Fetch } from "./Fetch";
import { DateQueue } from "./DateQueue";
import { ready as readyFreeQueue } from "./free-queue/ready";

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

  DateQueue.getDateQueueCandidates(
    DateQueueChannel.GET_CANDIDATES,
    DateQueueChannel.GET_CANDIDATES_SUCCEEDED,
    DateQueueChannel.GET_CANDIDATES_FAILED
  );

  readyFreeQueue();
};

export default standByDatabaseOperations;
