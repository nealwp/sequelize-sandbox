import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { CharacterAttributes, CharacterCreationAttributes } from '../@types/character.types';
import { Inventory } from './inventory.model';

@Table({tableName: 'characters'})
class Character extends Model<CharacterAttributes, CharacterCreationAttributes> implements CharacterAttributes{
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number

    @Column
    name!: string

    @Column
    age!: number

    @HasMany(() => Inventory)
    inventory!: Inventory[]
}

export { Character }