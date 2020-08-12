export namespace Candidate {
  export interface Candidate {
    readonly id: string;
  }

  export interface FreeQueueCandidate extends Candidate {
    readonly id: string;
    readonly start_epoch_second: number;
    readonly problem_id: string;
    readonly contest_id: string;
    readonly problem_title: string;
    readonly contest_title: string;
    readonly rate_change: string;
  }

  export interface DateQueueCandidate extends Candidate {
    readonly id: string;
    readonly epoch_second: number;
  }
}
