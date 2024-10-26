import { Umzug, SequelizeStorage } from 'umzug';
import fs from 'node:fs';
import { client } from './src/db';

const umzug = new Umzug({
    migrations: { glob: './src/migrations/*.ts' },
    context: client.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize: client }),
    logger: console, // log generated queries to console
    create: {
        template: filepath => [
            [filepath, fs.readFileSync('example-migration.ts').toString()]
        ],
        folder: './src/migrations',
    }
});

if (require.main === module) {
    umzug.runAsCLI().then(() => process.exit());
}
