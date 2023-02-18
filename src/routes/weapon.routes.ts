import { Router } from "express";
import { weapons } from "../controllers";
import { WeaponCreationAttributes } from "../@types/weapon.types";

const router = Router()

router.get('/', async (req, res, next) => {
    const allWeapons = await weapons.findAll()
    if(!allWeapons.length){
        return res.status(204).send()
    }
    return res.status(200).json(allWeapons)
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const weapon = await weapons.findById(+id)
        res.status(200).json(weapon)
    } catch (error) {
        console.error(error)
        res.status(404).send(`weapon with id ${id} not found`)
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

router.post('/inventory', async (req, res, next) => {
    const { id, inventoryId } = req.body as {id: number, inventoryId: number}
    try {
        const updatedWeapon = await weapons.addToInventory(id, inventoryId)
        res.status(200).json(updatedWeapon)
    } catch (error){
        console.error(error)
        res.status(500).send(`error adding weapon ${id} to inventory ${inventoryId}`)
    }
})

export default router