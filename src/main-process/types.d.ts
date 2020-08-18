type UserName = string | null;

interface SwitchToCollect {
  abc: boolean;
  arc: boolean;
  agc: boolean;
  joi: boolean;
  past: boolean;
  jag: boolean;
  other_rated: boolean;
  other_unrated: boolean;
}

interface UserSubmissions {
  length_of_days: 365;
  length_of_submissions: 5000;
}

export interface Config {
  user_id: UserName;
  switch_to_collect: SwitchToCollect;
  user_submissions: UserSubmissions;
}

export interface DatabaseUpdateLog {
  contests: number | null;
  problems: number | null;
  problem_models: number | null;
  user_submissions: number | null;
}

export interface Log {
  error: Array<string>;
}
