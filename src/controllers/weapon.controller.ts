import { WeaponCreationAttributes, WeaponAttributes } from "../@types/weapon.types";
import { Weapon } from "../models";

const create = async (weapon: WeaponCreationAttributes): Promise<Weapon> => {
    return await Weapon.create(weapon)
}

const getAll = async (): Promise<Weapon[]> => {
    return await Weapon.findAll()
}
 
export {
    create,
    getAll
}