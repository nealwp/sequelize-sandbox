import { Router } from 'express';
import PropertyRouter from './property/routes'

const router = Router();

router.get('/health', (_, res) => {
    return res.status(200);
});

router.

export default router;
