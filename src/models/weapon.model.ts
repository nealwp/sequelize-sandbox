import { ModelAttributeColumnOptions } from 'sequelize';
import { Table, Column, Model, ForeignKey, BelongsTo, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Weapon as WeaponCreationAttributes } from '../@types/weapon.types';
import { Inventory } from './inventory.model';

interface WeaponAttributes extends WeaponCreationAttributes {
    id: number,
    createdAt: Date,
    updatedAt: Date
}

type WeaponKeys = keyof WeaponAttributes

interface ColumnOptions extends ModelAttributeColumnOptions {
    field: string
}

const tableDefinition = {
    tableName: 'weapon'
}

const columnDefinition: Record<WeaponKeys, ColumnOptions> = {
    id: {
        primaryKey: true,
        field: 'id',
        autoIncrement: true,
        type: DataType.INTEGER
    },
    name: {
        field: 'name',
        type: DataType.STRING
    },
    damage: {
        field: 'damage',
        type: DataType.INTEGER
    },
    inventoryId: {
        field: 'inventory_id',
        type: DataType.INTEGER,
        references: {
            model: 'inventory',
            key: 'id'
        }
    },
    type: {
        field: 'type',
        type: DataType.STRING
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
class Weapon extends Model<WeaponAttributes, WeaponCreationAttributes> implements WeaponAttributes{
    
    @Column(columnDefinition.id)
    id!: number

    @ForeignKey(() => Inventory)
    @Column(columnDefinition.inventoryId)
    inventoryId!: number

    @BelongsTo(() => Inventory)
    inventory!: Inventory

    @Column(columnDefinition.name)
    name!: string

    @Column(columnDefinition.damage)
    damage!: number

    @Column(columnDefinition.type)
    type!: string

    @CreatedAt
    @Column(columnDefinition.createdAt)
    createdAt!: Date

    @UpdatedAt
    @Column(columnDefinition.updatedAt)
    updatedAt!: Date
}

export { Weapon, WeaponAttributes, WeaponCreationAttributes, columnDefinition, tableDefinition }