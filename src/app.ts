import * as db from './db';
import router from './routes';
import express from 'express';

const PORT = 3000;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(router);

db.initialize().then(async () => {
    await db.runMigrations();
    server.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`);
    });
});
