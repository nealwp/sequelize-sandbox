import { WeaponAttributes, WeaponController, WeaponCreationAttributes } from "../@types/weapon.types";
import { Weapon } from "../models";

const create = async (weapon: WeaponCreationAttributes): Promise<Weapon> => {
    return await Weapon.create(weapon)
}

const update = async (weapon: WeaponAttributes) => {
    const existingWeapon = await Weapon.findOne({where: {id: weapon.id}})
    
    if(!existingWeapon){
        throw new Error(`Weapon id ${weapon.id} not found!`)
    }

    return await existingWeapon.update(weapon)
}

const findById = async (id: number) => {
    const weapon = await Weapon.findOne({
        where: { id }
    })

    if(!weapon){
        throw new Error(`Weapon id ${ id } not found!`)
    }

    return weapon
}

const findAll = async (): Promise<Weapon[]> => {
    return await Weapon.findAll()
}

const addToInventory = async (id: number, inventoryId: number) => {
    const existingWeapon = await Weapon.findOne({where: { id }})
    
    if(!existingWeapon){
        throw new Error(`Weapon id ${id} not found!`)
    }

    return await existingWeapon.update({inventoryId: inventoryId})    
}
 
const weapons: WeaponController = {
    create,
    update,
    findById,
    findAll,
    addToInventory
}

export { weapons }
