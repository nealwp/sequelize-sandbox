
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

interface MissionTaskAttributes extends MissionTaskAPI {
    id: number;
    createdBy: string;
    createdDate: Date;
    updatedBy: string;
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

    createdBy: {
        field: "created_by",
        type: DataType.STRING,
    },
    createdDate: {
        field: "created_date",
        type: DataType.DATE,
    },
    updatedBy: {
        field: "updated_by",
        type: DataType.STRING,
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

	@Column(columnDefinition.sequence)
	sequence!: number

	@Column(columnDefinition.task)
	task!: string

	@Column(columnDefinition.status)
	status!: string

    @Column(columnDefinition.createdBy)
    createdBy!: string;

    @CreatedAt
    @Column(columnDefinition.createdDate)
    createdDate!: Date;

    @Column(columnDefinition.updatedBy)
    updatedBy!: string;

    @UpdatedAt
    @Column(columnDefinition.updatedDate)
    updatedDate!: Date;
}
    