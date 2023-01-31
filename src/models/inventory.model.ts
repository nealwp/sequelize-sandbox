import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { InventoryAttributes, InventoryCreationAttributes } from '../@types/inventory.types';
import { Character } from './character.model';
import { Weapon } from './weapon.model';

@Table({tableName: 'inventory'})
class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number

    @ForeignKey(() => Character)
    @Column
    characterId!: number

    @BelongsTo(() => Character)
    character!: Character

    @HasMany(() => Weapon)
    weapons!: Weapon[]
}

export { Inventory }
