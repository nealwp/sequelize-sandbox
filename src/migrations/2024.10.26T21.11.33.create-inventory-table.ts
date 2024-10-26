import { QueryInterface } from 'sequelize';
import { MigrationParams } from 'umzug'
import { DataType } from 'sequelize-typescript';

type Migration = (params: MigrationParams<QueryInterface>) => Promise<unknown>;

export const up: Migration = async ({ context: queryInterface }) => {
    await queryInterface.createTable('inventory', {
        id: { field: 'id', type: DataType.INTEGER, autoIncrementIdentity: true, primaryKey: true },
        characterId: { 
            field: 'character_id', 
            type: DataType.INTEGER, 
            references: { model: 'character', key: 'id' },
        },
    });
};
