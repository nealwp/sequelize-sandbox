import { Optional } from "sequelize";
import { Weapon } from "../models";
import { Controller } from "./controller.types";

const RANGED = "ranged" as const
const MELEE = "melee" as const

type WeaponType = typeof RANGED | typeof MELEE

interface WeaponAttributes {
    id: number,
    inventoryId: number,
    name: string,
    damage: number,
    type: WeaponType
}

interface WeaponCreationAttributes extends Optional<WeaponAttributes, 'id' | 'inventoryId'> {}

interface WeaponController extends Controller<Weapon, WeaponCreationAttributes> {
    addToInventory: (id: number, inventoryId: number) => Promise<Weapon>
}

export { RANGED, MELEE, WeaponType, WeaponAttributes, WeaponCreationAttributes, WeaponController }