
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

interface MissionAttributes extends MissionAPI {
    id: number;
    createdBy: string;
    createdDate: Date;
    updatedBy: string;
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
	name: {
		field: 'name',
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
export class Mission extends Model<MissionAttributes> implements MissionAttributes {
    @Column(columnDefinition.id)
    id!: number;

	@Column(columnDefinition.name)
	name!: string

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
    