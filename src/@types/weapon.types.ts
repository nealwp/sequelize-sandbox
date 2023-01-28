import { Optional } from "sequelize";

const RANGED = "ranged" as const
const MELEE = "melee" as const

type WeaponType = typeof RANGED | typeof MELEE

interface WeaponAttributes {
    id: number,
    name: string,
    damage: number,
    type: WeaponType
}

interface WeaponCreationAttributes extends Optional<WeaponAttributes, 'id'> {}

export { RANGED, MELEE, WeaponType, WeaponAttributes, WeaponCreationAttributes }