import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { CharacterAttributes, CharacterCreationAttributes } from '../@types/character.types';

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
}