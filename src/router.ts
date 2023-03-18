import { Router } from "express";
import { CharacterCreationAttributes } from "./models/character.model";
import { characters } from "./controller";

const router = Router()

router.get('/', async (req, res, next) => {
    const allCharacters = await characters.findAll()
    
    if(!allCharacters.length) {
        return res.status(204).send()
    } 
    
    return res.status(200).json(allCharacters)
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const character = await characters.findById(+id)
        res.status(200).json(character)
    } catch (error) {
        console.error(error)
        res.status(404).send(`character with id ${id} not found`)
    }
})

router.post('/', async (req, res, next) => {
    const character: CharacterCreationAttributes = req.body
    const result = await characters.upsert(character)
    res.status(result.status).json(result.body)
})


export default router