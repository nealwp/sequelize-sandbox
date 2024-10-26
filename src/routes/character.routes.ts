import { Router } from 'express';
import { CharacterCreationAttributes } from '../@types/character.types';
import { characters } from '../controllers';

const router = Router();

router.get('/', async (_, res) => {
    const allCharacters = await characters.findAll();

    if (!allCharacters.length) {
        return res.status(204).send();
    }

    return res.status(200).json(allCharacters);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const character = await characters.findById(+id);
        res.status(200).json(character);
    } catch (error) {
        console.error(error);
        res.status(404).send(`character with id ${id} not found`);
    }
});

router.post('/', async (req, res) => {
    const character: CharacterCreationAttributes = req.body;
    const createdCharacter = await characters.create(character);
    res.status(201).json(createdCharacter);
});

export default router;
