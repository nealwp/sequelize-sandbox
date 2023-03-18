import { ModelAttributeColumnOptions } from 'sequelize';
import { Table, Column, Model, ForeignKey, HasMany, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Inventory as InventoryCreationAttributes } from '../@types/inventory.types';
import { Character } from './character.model';
import { Weapon } from './weapon.model';

interface InventoryAttributes extends InventoryCreationAttributes {
    id: number,
    characterId: number,
    createdAt: Date,
    updatedAt: Date
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
        type: DataType.INTEGER,
        references: {
            model: 'character',
            key: 'id'
        }
    },
    createdAt: {
        field: 'created_at',
        type: DataType.DATE
    },
    updatedAt: {
        field: 'updated_at',
        type: DataType.DATE
    }
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

    @CreatedAt
    @Column(columnDefinition.createdAt)
    createdAt!: Date

    @UpdatedAt
    @Column(columnDefinition.updatedAt)
    updatedAt!: Date
}

export { Inventory, InventoryAttributes, InventoryCreationAttributes, columnDefinition, tableDefinition }
