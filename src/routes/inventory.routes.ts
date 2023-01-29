import { Router } from "express";
import { InventoryCreationAttributes } from "../@types/inventory.types";
import { inventories } from "../controllers";

const router = Router()

router.get('/', async (req, res, next) => {
    const allInventories = await inventories.getAll()
    res.status(200).json(allInventories)
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const inventory = await inventories.get(+id)
        res.status(200).json(inventory)
    } catch (error) {
        console.error(error)
        res.status(404).send()
    }
})

router.post('/', async (req, res, next) => {
    const inventory: InventoryCreationAttributes = req.body
    try {
        const createdInventory = await inventories.create(inventory)
        res.status(201).json(createdInventory)
    } catch(error) {
        console.error(error)
        res.status(500).send()
    }
    
})


export default router