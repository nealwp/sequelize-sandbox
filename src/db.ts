import { ModelAttributeColumnOptions } from 'sequelize';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';
import * as models from './models';

// this is to make explicit column names required, instead of
// allowing Sequelize to auto-generate them
export type ColumnOptions<T> = Record<keyof T, ModelAttributeColumnOptions & { field: string}>;

const DB_HOST = 'localhost';
const DB_USER = 'postgres';
const DB_PASS = 'postgres';
const DB_PORT = 5432;
const DB_NAME = 'sandbox-db';

const dbConfig: SequelizeOptions = {
    dialect: 'postgres',
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    database: DB_NAME,
    logging: false,
    models: Object.values(models),
};

const sequelize = new Sequelize(dbConfig);

async function initialize() {
    return sequelize.authenticate();
};

const MIGRATION_GLOB = process.env['NODE_ENV'] == 'production' ? `./dist/migrations/*.js` : `./src/migrations/*.ts`;

const umzug = new Umzug({
    migrations: { glob: MIGRATION_GLOB },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console, // log generated queries to console
});

async function runMigrations() {
    return umzug.up();
}

export { initialize, runMigrations, sequelize as client };
