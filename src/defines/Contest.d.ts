export namespace Contest {
  export interface RawContest {
    readonly id: string;
    readonly start_epoch_second: number;
    readonly duration_second: number;
    readonly title: string;
    readonly rate_change: string;
  }

  export interface Contest {
    readonly id: string;
    readonly contest_id: string;
    readonly start_epoch_second: number;
    readonly duration_second: number;
    readonly contest_title: string;
    readonly rate_change: string;
  }
}
