import { ModelAttributeColumnOptions } from 'sequelize';
import { Table, Column, Model, ForeignKey, BelongsTo, TableOptions, DataType } from 'sequelize-typescript';
import { Weapon as WeaponCreationAttributes } from '../@types/weapon.types';
import { Inventory } from './inventory.model';

interface WeaponAttributes extends WeaponCreationAttributes {
    id: number,
}

type WeaponKeys = keyof WeaponAttributes

interface ColumnOptions extends ModelAttributeColumnOptions {
    field: string
}

const tableDefinition: TableOptions = {
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
}

export { Weapon, WeaponAttributes, WeaponCreationAttributes, columnDefinition, tableDefinition }