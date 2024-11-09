import * as db from './db';
import router from './router';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJson from '../swagger.json';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

db.initialize().then(async () => {
    await db.runMigrations();
    app.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`);
    });
});
