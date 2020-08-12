export namespace ProblemModel {
  export interface RawProblemModel {
    readonly slope?: number;
    readonly intercept?: number;
    readonly variance?: number;
    readonly difficulty?: number;
    readonly discrimination?: number;
    readonly irt_loglikelihood?: number;
    readonly irt_users?: number;
    readonly is_experimental?: boolean;
  }

  export interface ProblemModel {
    readonly id: string;
    readonly problem_id?: string;
    readonly slope?: number;
    readonly intercept?: number;
    readonly variance?: number;
    readonly difficulty?: number;
    readonly discrimination?: number;
    readonly irt_loglikelihood?: number;
    readonly irt_users?: number;
    readonly is_experimental?: boolean;
  }
}
