import "sqlite3";
import Knex from "knex";
import * as os from "os";
import * as process from "process";

const databasePath = (): string => {
  if (process.env.NODE_ENV === "development") {
    return `${process.cwd()}/.atcoder-review/atcoder.sqlite`;
  } else {
    return `${os.homedir()}/.atcoder-review/atcoder.sqlite`;
  }
};
export const database = Knex({
  client: "sqlite3",
  connection: {
    filename: databasePath(),
  },
  useNullAsDefault: true,
});
