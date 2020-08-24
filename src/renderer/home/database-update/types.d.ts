export type Progress = "STANDS_BY" | "UPDATING" | "SUCCEEDED" | "FAILED";

type LastUpdate = number | null;
type Destination =
  | "CONTESTS"
  | "PROBLEMS"
  | "PROBLEM_MODELS"
  | "USER_SUBMISSIONS"
  | "ALL";

export interface UpdateStatus {
  lastUpdate: LastUpdate;
  progress: Progress;
}

export interface DatabaseUpdate {
  contests: UpdateStatus;
  problems: UpdateStatus;
  problemModels: UpdateStatus;
  userSubmissions: UpdateStatus;
}

export interface ActionOfDatabaseUpdate {
  destination: Destination;
  lastUpdate: LastUpdate;
  progress: Progress;
}
