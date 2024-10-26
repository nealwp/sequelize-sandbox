import { ColumnOptions } from '../db';
import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { Inventory } from './inventory.model';

interface CreationAttributes {
    name: string;
    age: number;
}

interface Attributes extends CreationAttributes {
    id: number;
}

const columns: ColumnOptions<Attributes> = {
    id: { field: 'id', type: DataType.INTEGER, autoIncrementIdentity: true, primaryKey: true },
    name: { field: 'name', type: DataType.STRING },
    age: { field: 'age', type: DataType.INTEGER },
}

@Table({ tableName: 'character' })
class Character extends Model<Attributes, CreationAttributes> implements Attributes {
    @Column(columns.id)
    override id!: number;

    @Column(columns.name)
    name!: string;

    @Column(columns.age)
    age!: number;

    @HasMany(() => Inventory)
    inventory!: Inventory[];
}

export { Character };
