import { ModelAttributeColumnOptions } from 'sequelize';
import { Table, Column, Model, HasMany, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Character as CharacterCreationAttributes} from '../@types/character.types';
import { Follower } from './follower.model';
import { Inventory } from './inventory.model';

interface CharacterAttributes extends CharacterCreationAttributes {
    id: number,
    createdAt: Date,
    updatedAt: Date
}

type CharacterKeys = keyof CharacterAttributes

interface ColumnOptions extends ModelAttributeColumnOptions {
    field: string
}

export const tableDefinition = {
    tableName: 'character'
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
class Character extends Model<CharacterAttributes, CharacterCreationAttributes> implements CharacterAttributes {
    
    @Column(columnDefinition.id)
    id!: number

    @Column(columnDefinition.name)
    name!: string

    @Column(columnDefinition.age)
    age!: number

    @CreatedAt
    @Column(columnDefinition.createdAt)
    createdAt!: Date

    @UpdatedAt
    @Column(columnDefinition.updatedAt)
    updatedAt!: Date

    @HasMany(() => Inventory)
    inventory!: Inventory[]

    @HasMany(() => Follower)
    followers!: Follower[]
}

export { Character, CharacterAttributes, CharacterCreationAttributes }