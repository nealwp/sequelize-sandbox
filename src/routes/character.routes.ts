import { Router } from "express";
import { CharacterCreationAttributes } from "../@types/character.types";
import { characters } from "../controllers";

const router = Router()

router.get('/', async (req, res, next) => {
    const allCharacters = await characters.findAll()
    res.status(200).json(allCharacters)
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const character = await characters.findById(+id)
        res.status(200).json(character)
    } catch (error) {
        console.error(error)
        res.status(404).send()
    }
})

router.post('/', async (req, res, next) => {
    const character: CharacterCreationAttributes = req.body
    const createdCharacter = await characters.create(character)
    res.status(201).json(createdCharacter)
})


export default router