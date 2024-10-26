import { QueryInterface } from 'sequelize';
import { MigrationParams } from 'umzug'
import { DataType } from 'sequelize-typescript';

type Migration = (params: MigrationParams<QueryInterface>) => Promise<unknown>;

export const up: Migration = async ({ context: queryInterface }) => {
    await queryInterface.createTable('weapon', {
        id: { field: 'id', type: DataType.INTEGER, autoIncrementIdentity: true, primaryKey: true },
        inventoryId: { field: 'inventory_id', type: DataType.INTEGER, references: { model: 'inventory', key: 'id' }},
        name: { field: 'name', type: DataType.STRING },
        damage: { field: 'damage', type: DataType.FLOAT },
        type: { field: 'type', type: DataType.STRING },
    });
};
