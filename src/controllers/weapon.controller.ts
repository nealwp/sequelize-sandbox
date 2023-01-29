import { Controller } from "../@types/controller.types";
import { WeaponAttributes, WeaponCreationAttributes } from "../@types/weapon.types";
import { Weapon } from "../models";

const create = async (weapon: WeaponCreationAttributes): Promise<Weapon> => {
    return await Weapon.create(weapon)
}

const update = async (weapon: Weapon) => {
    const existingWeapon = await Weapon.findOne({where: {id: weapon.id}})
    
    if(!existingWeapon){
        throw new Error(`Weapon id ${weapon.id} not found!`)
    }

    return await existingWeapon.update(weapon)
}

const getAll = async (): Promise<Weapon[]> => {
    return await Weapon.findAll()
}
 
const weapons: Controller<Weapon, WeaponCreationAttributes> = {
    create,
    update,
    getAll
}

export default weapons
