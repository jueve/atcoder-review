export namespace Problem {
  export interface RawProblem {
    readonly id: string;
    readonly contest_id: string;
    readonly title: string;
  }

  export interface Problem {
    readonly id: string;
    readonly problem_id: string;
    readonly contest_id: string;
    readonly problem_title: string;
  }
}
