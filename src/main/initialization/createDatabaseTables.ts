import { database } from "../database";
import { ipcMain } from "electron";
import { TableName } from "../database/TableName";
import { SchemaBuilder } from "knex";

type CreateDatabaseTables =
  | "CREATE_DATABASE_TABLES"
  | "CREATE_DATABASE_TABLES_SUCCEEDED"
  | "CREATE_DATABASE_TABLES_FAILED";

export const CREATE_DATABASE_TABLES = "CREATE_DATABASE_TABLES";
export const CREATE_DATABASE_TABLES_SUCCEEDED =
  "CREATE_DATABASE_TABLES_SUCCEEDED";
export const CREATE_DATABASE_TABLES_FAILED = "CREATE_DATABASE_TABLES_FAILED";

const message: Record<string, string> = {
  succeeded: "Succeeded to create the database tables.",
  failed: "Failed to create the database tables.",
  exists: "The database tables already exist.",
};

const tableExists = async (tableName: TableName): Promise<boolean> => {
  return database.schema.hasTable(tableName).then((exists) => {
    return exists;
  });
};

const cond = async (): Promise<boolean> => {
  const freeQueue = await tableExists("free_queue");
  const contests = await tableExists("contests");
  const problems = await tableExists("problems");
  const problemModels = await tableExists("problem_models");
  const userSubmissions = await tableExists("user_submissions");

  return freeQueue && contests && problems && problemModels && userSubmissions;
};

const createTablesForFreeQueue = (): void => {
  database.schema
    .hasTable("free_queue")
    .then((exists): void | SchemaBuilder => {
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
};

const createTablesForFetch = (): void => {
  database.schema.hasTable("contests").then((exists): void | SchemaBuilder => {
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

  database.schema.hasTable("problems").then((exists): void | SchemaBuilder => {
    if (!exists) {
      return database.schema.createTable("problems", (table) => {
        table.uuid("id").primary();
        table.string("problem_id").notNullable();
        table.string("contest_id").notNullable();
        table.string("problem_title").notNullable();
      });
    }
  });

  database.schema
    .hasTable("problem_models")
    .then((exists): void | SchemaBuilder => {
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

  database.schema
    .hasTable("user_submissions")
    .then((exists): void | SchemaBuilder => {
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
};

export const createDatabaseTables = (
  begin: CreateDatabaseTables,
  succeeded: CreateDatabaseTables,
  failed: CreateDatabaseTables
): void => {
  ipcMain.on(begin, (event): void => {
    try {
      cond().then((exist) => {
        if (exist) {
          event.reply(succeeded, message.exists);
        } else {
          createTablesForFetch();
          createTablesForFreeQueue();
          event.reply(succeeded, message.succeeded);
        }
      });
    } catch (error) {
      event.reply(failed, message.failed);
    }
  });
};
