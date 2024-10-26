import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { ColumnOptions } from '../db';
import { Inventory } from './inventory.model';

interface CreationAttributes {
    inventoryId: number;
    name: string;
    damage: number;
    type: string;
}

interface Attributes extends CreationAttributes {
    id: number;
}

const columns: ColumnOptions<Attributes> = {
    id: { field: 'id', type: DataType.INTEGER, autoIncrementIdentity: true, primaryKey: true },
    inventoryId: { field: 'inventory_id', type: DataType.INTEGER, references: { model: 'inventory', key: 'id' }},
    name: { field: 'name', type: DataType.STRING },
    damage: { field: 'damage', type: DataType.FLOAT },
    type: { field: 'type', type: DataType.STRING },
}

@Table({ tableName: 'weapon' })
class Weapon extends Model<Attributes, CreationAttributes> implements Attributes {
    @Column(columns.id)
    override id!: number;

    @ForeignKey(() => Inventory)
    @Column(columns.inventoryId)
    inventoryId!: number;

    @Column(columns.name)
    name!: string;

    @Column(columns.damage)
    damage!: number;

    @Column(columns.type)
    type!: string;
}

export { Weapon };
