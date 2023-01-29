import { Router } from "express";
import { weapons } from "../controllers";
import { WeaponCreationAttributes } from "../@types/weapon.types";

const router = Router()

router.get('/', async (req, res, next) => {
    const allWeapons = await weapons.getAll()
    res.status(200).json(allWeapons)
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const weapon = await weapons.get(+id)
        res.status(200).json(weapon)
    } catch (error) {
        console.error(error)
        res.status(404).send()
    }
})

router.post('/', async (req, res, next) => {
    const weapon: WeaponCreationAttributes = req.body
    try {
        const createdWeapon = await weapons.create(weapon)
        res.status(201).json(createdWeapon)
    } catch(error) {
        console.error(error)
        res.status(500).send()
    }
    
})

export default router