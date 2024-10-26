import { Table, Column, Model, ForeignKey, HasMany, DataType } from 'sequelize-typescript';
import { ColumnOptions } from '../db';
import { Character } from './character.model';
import { Weapon } from './weapon.model';

interface CreationAttributes {
    characterId: number;
}

interface Attributes extends CreationAttributes {
    id: number;
}

const columns: ColumnOptions<Attributes> = {
    id: { field: 'id', type: DataType.INTEGER, autoIncrementIdentity: true, primaryKey: true },
    characterId: { 
        field: 'character_id', 
        type: DataType.INTEGER, 
        references: { model: 'character', key: 'id' },
    },
}

@Table({ tableName: 'inventory' })
class Inventory extends Model<Attributes, CreationAttributes> implements Attributes {
    @Column(columns.id)
    override id!: number;

    @ForeignKey(() => Character)
    @Column(columns.characterId)
    characterId!: number;

    @HasMany(() => Weapon)
    weapons!: Weapon[];
}

export { Inventory };
