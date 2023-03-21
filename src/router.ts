import { Router } from "express";
import { CharacterCreationAttributes } from "./models/character.model";
import { characters } from "./controller";
import { CharacterPayload } from "./@types/payload.types";

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
    const payload: CharacterPayload = req.body
    const result = await characters.upsert(payload)
    res.status(result.status).json(result.body)
})


export default router