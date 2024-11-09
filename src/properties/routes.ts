import { Router } from 'express';
import service from './service';

const router = Router();

router.get('/', (_, res) => {
    try {
        const properties = service.listProperties();
        return res.status(200).json(properties);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.post('/', (_, res) => {
    try {   
        return res.status(201).send()
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.patch('/:id', (req, res) => {
    try {
        const { id } = req.params;
        return res.status(200).json(id);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        return res.status(200).json(id);
    } catch (error) {
        return res.status(500).send(error);
    }
});

export default router;

