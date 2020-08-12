export namespace Item {
  export interface Item {
    id: string;
  }

  export interface FreeQueueItem extends Item {
    readonly id: string;
    readonly date: number;
    readonly start_epoch_second: number;
    readonly is_done: boolean | number;
    readonly problem_title: string;
    readonly contest_title: string;
    readonly url: string;
    readonly difficulty: number;
    readonly is_experimental: boolean | number;
  }

  export interface DateQueueItem extends Item {
    id: string;
    date: string;
    done: number;
    content: Array<FreeQueueItem>;
  }
}
