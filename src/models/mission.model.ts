
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

import { Mission as MissionAPI } from '../@types/mission.types'
import { ModelAttributeColumnOptions } from 'sequelize';
import { Character } from './character.model';
import { MissionTask } from './mission-task.model';

interface MissionAttributes extends MissionAPI {
    id: number;
    characterId:  number;
    createdDate: Date;
    updatedDate: Date;
}

type MissionKeys = keyof MissionAttributes

interface ColumnOptions extends ModelAttributeColumnOptions {
    field: string
}

export const tableDefinition = {
    tableName: 'mission', 
}

export const columnDefinition: Record<MissionKeys, ColumnOptions> = {
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
	status: {
		field: 'status',
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
export class Mission extends Model<MissionAttributes> implements MissionAttributes {
    @Column(columnDefinition.id)
    id!: number;

    @ForeignKey(() => Character)
    @Column(columnDefinition.characterId)
    characterId!: number;

	@Column(columnDefinition.name)
	name!: string

	@Column(columnDefinition.status)
	status!: string

    @CreatedAt
    @Column(columnDefinition.createdDate)
    createdDate!: Date;

    @UpdatedAt
    @Column(columnDefinition.updatedDate)
    updatedDate!: Date;

    @HasMany(() => MissionTask)
    missionTasks!: MissionTask[]
}
    