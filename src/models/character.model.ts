import { ModelAttributeColumnOptions } from 'sequelize';
import { Table, Column, Model, HasMany, DataType, TableOptions } from 'sequelize-typescript';
import { Character as CharacterCreationAttributes} from '../@types/character.types';
import { Inventory } from './inventory.model';

interface CharacterAttributes extends CharacterCreationAttributes {
    id: number
}

type CharacterKeys = keyof CharacterAttributes

interface ColumnOptions extends ModelAttributeColumnOptions {
    field: string
}

export const tableDefinition = {
    tableName: 'characters'
}

export const columnDefinition: Record<CharacterKeys, ColumnOptions> = {
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
    age: {
        field: 'age',
        type: DataType.INTEGER
    }
}

@Table(tableDefinition)
class Character extends Model<CharacterAttributes, CharacterCreationAttributes> implements CharacterAttributes {
    
    @Column(columnDefinition.id)
    id!: number

    @Column(columnDefinition.name)
    name!: string

    @Column(columnDefinition.age)
    age!: number

    @HasMany(() => Inventory)
    inventory!: Inventory[]
}

export { Character, CharacterAttributes, CharacterCreationAttributes }