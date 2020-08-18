type UserName = string | null;

interface SwitchToCollect {
  abc: boolean;
  arc: boolean;
  agc: boolean;
  joi: boolean;
  past: boolean;
  jag: boolean;
  otherRated: boolean;
  otherUnrated: boolean;
}

interface UserSubmissions {
  lengthOfDays: 365;
  lengthOfSubmissions: 5000;
}

export interface Config {
  userId: UserName;
  switchToCollect: SwitchToCollect;
  userSubmissions: UserSubmissions;
}

export interface DatabaseUpdateLog {
  contests: number | null;
  problems: number | null;
  problemModels: number | null;
  userSubmissions: number | null;
}

export interface Log {
  error: Array<string>;
}
