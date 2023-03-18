import { QueryInterface } from 'sequelize';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';
import { UmzugOptions } from 'umzug/lib/types';
import * as models from './models'

const config = {
  DB_URL: 'localhost',
  DB_USER: 'postgres',
  DB_PASS: 'postgres',
  DB_PORT: 5432,
  DB_NAME: 'scratch'
}

const dbConfig: SequelizeOptions = {
  dialect: 'postgres',
  host: config.DB_URL,
  username: config.DB_USER,
  password: config.DB_PASS,
  port: config.DB_PORT,
  database: config.DB_NAME,
  logging: false,
  models: Object.values(models),

};

const sequelize = new Sequelize(dbConfig);

const umzugConfig: UmzugOptions<QueryInterface> = {
  migrations: { glob: './src/migrations/*.ts'},
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'rpg_meta'
  }),
  logger: console
}

const umzug = new Umzug(umzugConfig)

export type Migration = typeof umzug._types.migration

const initialize = async () => {
  try {
    await sequelize.authenticate();
    await umzug.up()
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error(`Error initializing database: ${error}`)
  }
  
}

export { initialize, sequelize as client }