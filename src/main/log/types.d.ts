type LastUpdate = number | null;

export interface DatabaseUpdateLog {
  contests: LastUpdate;
  problems: LastUpdate;
  problemModels: LastUpdate;
  userSubmissions: LastUpdate;
}

export type Result = "SUCCEEDED" | "FAILED";
