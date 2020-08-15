export type Fetch = "STANDS_BY" | "UPDATING" | "SUCCEEDED" | "FAILED";

export interface FetchStatus {
  lastUpdate: number;
  progress: Fetch;
}
