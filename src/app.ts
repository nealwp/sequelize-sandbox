import * as db from './db';
import router from './router';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJson from '../swagger.json'

const PORT = 3000;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/api', router);

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

db.initialize().then(async () => {
    await db.runMigrations();
    server.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`);
    });
});
