import { Controller } from "../@types/controller.types";
import { InventoryAttributes, InventoryCreationAttributes } from "../models/inventory.model";
import { Inventory, Weapon } from "../models";

interface InventoryController extends Controller<Inventory, InventoryAttributes, InventoryCreationAttributes> {}

const findAll = async () => {
    return Inventory.findAll({include: Weapon})
}

const create = async (inventory: InventoryCreationAttributes) => {
    return Inventory.create(inventory)
}

const findById = async (id: number) => {
    const inventory = await Inventory.findOne({
        where: { id },
        include: Weapon
    })
    if(!inventory){
        throw new Error(`Inventory id ${id} not found!`)
    }

    return inventory
}

const update = async (inventory: InventoryAttributes) => {
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