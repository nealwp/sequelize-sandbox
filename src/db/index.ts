import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
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
  models: [path.join(__dirname + '/models')],
};

const sequelize = new Sequelize(dbConfig);

async function initialize() {
  return await sequelize.authenticate();
}

export { initialize }