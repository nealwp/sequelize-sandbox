import { QueryInterface } from 'sequelize';
import { MigrationParams } from 'umzug';
import { DataType } from 'sequelize-typescript';

type Migration = (params: MigrationParams<QueryInterface>) => Promise<unknown>;

export const up: Migration = async ({ context: queryInterface }) => {
    await queryInterface.createTable('character', {
        id: { field: 'id', type: DataType.INTEGER, autoIncrementIdentity: true, primaryKey: true },
        name: { field: 'name', type: DataType.STRING },
        age: { field: 'age', type: DataType.INTEGER },
    });
};
