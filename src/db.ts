import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import * as models from './models'

import * as path from 'path'

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
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },
  models: Object.values(models),
};

const sequelize = new Sequelize(dbConfig);

async function initialize() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log("All models were synchronized successfully.");
}

export { initialize }