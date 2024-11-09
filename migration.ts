import { Umzug } from 'umzug';
import fs from 'node:fs';

const umzug = new Umzug({
    migrations: { glob: './src/migrations/*.ts' },
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
