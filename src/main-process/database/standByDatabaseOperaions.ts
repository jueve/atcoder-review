import { DateQueue as DateQueueChannel } from "./channel-name";
import { DateQueue } from "./DateQueue";
import { ready as readyFreeQueue } from "./free-queue/ready";
import { ready as readyFetch } from "./fetch/ready";

const standByDatabaseOperations = (): void => {
  readyFreeQueue();
  readyFetch();
};

export default standByDatabaseOperations;
