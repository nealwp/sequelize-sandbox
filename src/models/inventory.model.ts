import { ModelAttributeColumnOptions } from 'sequelize';
import { Table, Column, Model, ForeignKey, HasMany, TableOptions, DataType } from 'sequelize-typescript';
import { Inventory as InventoryCreationAttributes } from '../@types/inventory.types';
import { Character } from './character.model';
import { Weapon } from './weapon.model';

interface InventoryAttributes extends InventoryCreationAttributes {
    id: number,
    characterId: number
}

const tableDefinition = {
    tableName: 'inventory'
}

interface ColumnOptions extends ModelAttributeColumnOptions {
    field: string
}

type InventoryKeys = keyof InventoryAttributes

const columnDefinition: Record<InventoryKeys, ColumnOptions> = {
    id: {
        primaryKey: true,
        field: 'id',
        autoIncrement: true,
        type: DataType.INTEGER
    },
    characterId: {
        field: 'character_id',
        type: DataType.STRING,
        references: {
            model: 'character',
            key: 'id'
        }
    },
}

@Table(tableDefinition)
class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {

    @Column(columnDefinition.id)
    id!: number

    @ForeignKey(() => Character)
    @Column(columnDefinition.characterId)
    characterId!: number

    @HasMany(() => Weapon)
    weapons!: Weapon[]
}

export { Inventory, InventoryAttributes, InventoryCreationAttributes, columnDefinition, tableDefinition }
