import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { WeaponAttributes, WeaponCreationAttributes, WeaponType } from '../@types/weapon.types';
import { Inventory } from './inventory.model';

@Table({tableName: 'weapons'})
class Weapon extends Model<WeaponAttributes, WeaponCreationAttributes> implements WeaponAttributes{
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number

    @ForeignKey(() => Inventory)
    @Column
    inventoryId!: number

    @BelongsTo(() => Inventory)
    inventory!: Inventory

    @Column
    name!: string

    @Column
    damage!: number

    @Column
    type!: WeaponType
}

export { Weapon }