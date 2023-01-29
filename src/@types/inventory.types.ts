import { Optional } from 'sequelize';

interface InventoryAttributes {
    id: number,
    characterId: number
}

interface InventoryCreationAttributes extends Optional<InventoryAttributes, 'id'> {}

export {InventoryAttributes, InventoryCreationAttributes}