export namespace UserSubmission {
  export interface RawUserSubmission {
    readonly id: number;
    readonly epoch_second: number;
    readonly problem_id: string;
    readonly contest_id: string;
    readonly user_id: string;
    readonly language: string;
    readonly point: number;
    readonly length: number;
    readonly result: string;
    readonly execution_time: number;
  }

  export interface UserSubmission {
    readonly id: string;
    readonly submission_id: number;
    readonly epoch_second: number;
    readonly problem_id: string;
    readonly contest_id: string;
    readonly user_id: string;
    readonly language: string;
    readonly point: number;
    readonly length: number;
    readonly result: string;
    readonly execution_time: number;
  }
}

export default Submission;
