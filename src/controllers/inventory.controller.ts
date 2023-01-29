import { InventoryController, InventoryCreationAttributes } from "../@types/inventory.types";
import { Inventory, Weapon } from "../models";

const findAll = async () => {
    return Inventory.findAll({include: Weapon})
}

const create = async (inventory: InventoryCreationAttributes) => {
    return Inventory.create(inventory)
}

const findById = async (id: number) => {
    const inventory = await Inventory.findOne({
        where: { id }
    })
    if(!inventory){
        throw new Error(`Inventory id ${id} not found!`)
    }

    return inventory
}

const update = async (inventory: Inventory) => {
    const existingInventory = await Inventory.findOne({where: {id: inventory.id}})
    
    if(!existingInventory){
        throw new Error(`Inventory id ${inventory.id} not found!`)
    }

    return await existingInventory.update(inventory)
}

const inventory: InventoryController = {
    findAll,
    update,
    create,
    findById
}

export { inventory }