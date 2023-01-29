import { Router } from "express";
import { InventoryCreationAttributes } from "../@types/inventory.types";
import { inventory } from "../controllers";

const router = Router()

router.get('/', async (req, res, next) => {
    const allInventories = await inventory.findAll()
    res.status(200).json(allInventories)
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const foundInventory = await inventory.findById(+id)
        res.status(200).json(foundInventory)
    } catch (error) {
        console.error(error)
        res.status(404).send()
    }
})

router.post('/', async (req, res, next) => {
    const payload: InventoryCreationAttributes = req.body
    try {
        const createdInventory = await inventory.create(payload)
        res.status(201).json(createdInventory)
    } catch(error) {
        console.error(error)
        res.status(500).send()
    } 
})


export default router