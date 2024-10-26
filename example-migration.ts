import { QueryInterface } from 'sequelize';
import { MigrationParams } from 'umzug'
import { DataType } from 'sequelize-typescript';

type Migration = (params: MigrationParams<QueryInterface>) => Promise<unknown>;

export const up: Migration = async ({ context: queryInterface }) => {
    //await queryInterface.createSchema()
    //await queryInterface.createTable();
    //await queryInterface.addColumn();
    //await queryInterface.changeColumn();
    //await queryInterface.removeColumn();
    //await queryInterface.dropTable(); 
};
