import { DatabaseUpdate, ActionOfDatabaseUpdate } from "./types";

export const reducer = (
  state: DatabaseUpdate,
  action: ActionOfDatabaseUpdate
): DatabaseUpdate => {
  switch (action.destination) {
    case "CONTESTS":
      return {
        ...state,
        contests: { lastUpdate: action.lastUpdate, progress: action.progress },
      };
    case "PROBLEMS":
      return {
        ...state,
        problems: { lastUpdate: action.lastUpdate, progress: action.progress },
      };
    case "PROBLEM_MODELS":
      return {
        ...state,
        problemModels: {
          lastUpdate: action.lastUpdate,
          progress: action.progress,
        },
      };
    case "USER_SUBMISSIONS":
      return {
        ...state,
        userSubmissions: {
          lastUpdate: action.lastUpdate,
          progress: action.progress,
        },
      };

    case "ALL":
      return {
        contests: { lastUpdate: action.lastUpdate, progress: action.progress },
        problems: { lastUpdate: action.lastUpdate, progress: action.progress },
        problemModels: {
          lastUpdate: action.lastUpdate,
          progress: action.progress,
        },
        userSubmissions: {
          lastUpdate: action.lastUpdate,
          progress: action.progress,
        },
      };

    default:
      return state;
  }
};
