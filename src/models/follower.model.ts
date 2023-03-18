
import {
    Column,
    Table,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    HasMany,
} from 'sequelize-typescript';

import { Follower as FollowerAPI } from '../@types/follower.types'
import { ModelAttributeColumnOptions } from 'sequelize';
import { Character } from './character.model';

interface FollowerAttributes extends FollowerAPI {
    id: number;
    characterId: number;
    createdDate: Date;
    updatedDate: Date;
}

type FollowerKeys = keyof FollowerAttributes

interface ColumnOptions extends ModelAttributeColumnOptions {
    field: string
}

export const tableDefinition = {
    tableName: 'follower', 
}

export const columnDefinition: Record<FollowerKeys, ColumnOptions> = {
    id: {
        field: "id",
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    characterId: {
        field: "character_id",
        type: DataType.INTEGER,
        references: {
            model: Character,
            key: 'id'
        }
    },   
	name: {
		field: 'name',
		type: DataType.STRING
	},
	ability: {
		field: 'ability',
		type: DataType.STRING
	},

    createdDate: {
        field: "created_date",
        type: DataType.DATE,
    },
    updatedDate: {
        field: "updated_date",
        type: DataType.DATE,
    },
}

@Table(tableDefinition)
export class Follower extends Model<FollowerAttributes> implements FollowerAttributes {
    @Column(columnDefinition.id)
    id!: number;

    @ForeignKey(() => Character)
    @Column(columnDefinition.characterId)
    characterId!: number;

	@Column(columnDefinition.name)
	name!: string

	@Column(columnDefinition.ability)
	ability!: string

    @CreatedAt
    @Column(columnDefinition.createdDate)
    createdDate!: Date;

    @UpdatedAt
    @Column(columnDefinition.updatedDate)
    updatedDate!: Date;
}
    