import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { WeaponAttributes, WeaponCreationAttributes, WeaponType } from '../@types/weapon.types';

@Table({tableName: 'weapons'})
export class Weapon extends Model<WeaponAttributes, WeaponCreationAttributes> {
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number

    @Column
    name!: string

    @Column
    damage!: number

    @Column
    type!: WeaponType
}