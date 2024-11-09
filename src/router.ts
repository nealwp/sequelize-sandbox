import { Router } from 'express';
import PropertiesRouter from './properties/routes'
import shared from './shared';

const router = Router();

router.get('/', (req, res) => {
    return res.status(200).json({
        _links: shared.getHATEOSLinks(req, router)
    });
});

router.get('/api/health', (_, res) => {
    return res.status(200);
});

router.use('/api/properties', PropertiesRouter);

export default router;
