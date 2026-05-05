import "dotenv/config";
import { Umzug, SequelizeStorage } from "umzug";
import { Sequelize, Options } from "sequelize";
import config from "./config";

const sequelize = new Sequelize(config.db as Options);

export const migrator = new Umzug({
  migrations: {
    glob: ["migrations/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export const seeder = new Umzug({
  migrations: {
    glob: ["seeders/*.ts", { cwd: __dirname }],
    resolve: ({ name, path, context }) => {
      const seederFile = require(path as string);
      return {
        name,
        up: async () => seederFile.up(context, Sequelize),
        down: async () => seederFile.down(context, Sequelize),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, modelName: "SequelizeData" }), // Table séparée
  logger: console,
});

export type Migration = typeof migrator._types.migration;
