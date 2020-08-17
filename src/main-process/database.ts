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
const database = Knex({
  client: "sqlite3",
  connection: {
    filename: databasePath(),
  },
  useNullAsDefault: true,
});

//database.schema.dropTableIfExists("problems");
//database.schema.dropTableIfExists("contests");
//database.schema.dropTableIfExists("user_submissions");

// free queue
database.schema.dropTableIfExists("free-queue");
database.schema.hasTable("free_queue").then((exists) => {
  if (!exists) {
    return database.schema.createTable("free_queue", (table) => {
      table.uuid("id").primary();
      table.integer("date").notNullable();
      table.integer("start_epoch_second").notNullable();
      table.string("problem_title", 100).notNullable();
      table.string("contest_title", 100).notNullable();
      table.string("url", 2100).notNullable();
      table.integer("difficulty").notNullable();
      table.boolean("is_experimental").notNullable();
      table.boolean("is_done").notNullable();
    });
  }
});

// date queue
database.schema.hasTable("date_queue").then((exists) => {
  if (!exists) {
    return database.schema.createTable("date_queue", (table) => {
      table.uuid("id").primary();
      table.date("date");
      table.boolean("is_done");
    });
  }
});

// free queue items in date queue
database.schema.hasTable("fqi_with_date_queue").then((exists) => {
  if (!exists) {
    return database.schema.createTable("fqi_with_date_queue", (table) => {
      table.uuid("id").primary();
      table.uuid("bind_id").notNullable();
      table.date("date").notNullable();
      table.string("problem_title", 100).notNullable();
      table.string("contest_title", 100).notNullable();
      table.string("url", 2100).notNullable();
      table.integer("difficulty").notNullable();
      table.boolean("is_experimental").notNullable();
      table.boolean("is_done").notNullable();
    });
  }
});

database.schema.hasTable("contests").then((exists) => {
  if (!exists) {
    return database.schema.createTable("contests", (table) => {
      table.uuid("id").primary();
      table.string("contest_id", 100);
      table.specificType("start_epoch_second", "REAL");
      table.integer("duration_second");
      table.string("contest_title", 100);
      table.string("rate_change", 100);
    });
  }
});

// problems
database.schema.hasTable("problems").then((exists) => {
  if (!exists) {
    return database.schema.createTable("problems", (table) => {
      table.uuid("id").primary();
      table.string("problem_id").notNullable();
      table.string("contest_id").notNullable();
      table.string("problem_title").notNullable();
    });
  }
});

// problem models
database.schema.hasTable("problem_models").then((exists) => {
  if (!exists) {
    return database.schema.createTable("problem_models", (table) => {
      table.uuid("id").primary();
      table.string("problem_id");
      table.specificType("slope", "REAL");
      table.specificType("intercept", "REAL");
      table.specificType("variance", "REAL");
      table.specificType("difficulty", "REAL");
      table.specificType("discrimination", "REAL");
      table.specificType("irt_loglikelihood", "REAL");
      table.integer("irt_users", 100000);
      table.boolean("is_experimental");
    });
  }
});

// user submissions
database.schema.hasTable("user_submissions").then((exists) => {
  if (!exists) {
    return database.schema.createTable("user_submissions", (table) => {
      table.uuid("id").primary();
      table.integer("submission_id");
      table.integer("epoch_second");
      table.string("problem_id", 100);
      table.string("contest_id", 100);
      table.string("user_id", 100);
      table.string("language", 100);
      table.specificType("point", "REAL");
      table.integer("length");
      table.string("result", 10);
      table.integer("execution_time");
    });
  }
});

export default database;
