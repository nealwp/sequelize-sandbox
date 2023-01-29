import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { CharacterAttributes, CharacterCreationAttributes } from '../@types/character.types';
import { Inventory } from './inventory.model';

@Table({tableName: 'characters'})
export class Character extends Model<CharacterAttributes, CharacterCreationAttributes> {
    
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