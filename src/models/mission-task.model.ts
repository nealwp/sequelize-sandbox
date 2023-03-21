
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

import { MissionTask as MissionTaskAPI } from '../@types/mission-task.types'
import { ModelAttributeColumnOptions } from 'sequelize';
import { Mission } from './mission.model';

interface MissionTaskAttributes extends MissionTaskAPI {
    id: number;
    missionId: number;
    createdDate: Date;
    updatedDate: Date;
}

type MissionTaskKeys = keyof MissionTaskAttributes

interface ColumnOptions extends ModelAttributeColumnOptions {
    field: string
}

export const tableDefinition = {
    tableName: 'mission_task', 
}

export const columnDefinition: Record<MissionTaskKeys, ColumnOptions> = {
    id: {
        field: "id",
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    missionId: {
        field: "mission_id",
        type: DataType.INTEGER,
        references: {
            model: Mission,
            key: "id"
        }
    },   
	sequence: {
		field: 'sequence',
		type: DataType.DECIMAL
	},
	task: {
		field: 'task',
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
export class MissionTask extends Model<MissionTaskAttributes> implements MissionTaskAttributes {
    @Column(columnDefinition.id)
    id!: number;

    @ForeignKey(() => Mission)
    @Column(columnDefinition.missionId)
    missionId!: number;

	@Column(columnDefinition.sequence)
	sequence!: number

	@Column(columnDefinition.task)
	task!: string

	@Column(columnDefinition.status)
	status!: string

    @CreatedAt
    @Column(columnDefinition.createdDate)
    createdDate!: Date;

    @UpdatedAt
    @Column(columnDefinition.updatedDate)
    updatedDate!: Date;
}
    