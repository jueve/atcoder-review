import {
  updateProblems,
  UPDATE_PROBLEMS,
  UPDATE_PROBLEMS_SUCCEEDED,
  UPDATE_PROBLEMS_FAILED,
} from "./updateProblems";
import {
  updateContests,
  UPDATE_CONTESTS,
  UPDATE_CONTESTS_SUCCEEDED,
  UPDATE_CONTESTS_FAILED,
} from "./updateContests";
import {
  updateProblemModels,
  UPDATE_PROBLEM_MODELS,
  UPDATE_PROBLEM_MODELS_SUCCEEDED,
  UPDATE_PROBLEM_MODELS_FAILED,
} from "./updateProblemModels";
import {
  updateUserSubmissions,
  UPDATE_USER_SUBMISSIONS,
  UPDATE_USER_SUBMISSIONS_SUCCEEDED,
  UPDATE_USER_SUBMISSIONS_FAILED,
} from "./updateUserSubmission";

export const ready = (): void => {
  updateProblems(
    "problems",
    UPDATE_PROBLEMS,
    UPDATE_PROBLEMS_SUCCEEDED,
    UPDATE_PROBLEMS_FAILED
  );
  updateContests(
    "contests",
    UPDATE_CONTESTS,
    UPDATE_CONTESTS_SUCCEEDED,
    UPDATE_CONTESTS_FAILED
  );
  updateProblemModels(
    "problem_models",
    UPDATE_PROBLEM_MODELS,
    UPDATE_PROBLEM_MODELS_SUCCEEDED,
    UPDATE_PROBLEM_MODELS_FAILED
  );
  updateUserSubmissions(
    "user_submissions",
    UPDATE_USER_SUBMISSIONS,
    UPDATE_USER_SUBMISSIONS_SUCCEEDED,
    UPDATE_USER_SUBMISSIONS_FAILED
  );
};
