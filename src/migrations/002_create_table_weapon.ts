import { columnDefinition, tableDefinition } from '../models/weapon.model'
import type { Migration } from '../db'
import { TableName } from 'sequelize'

export const up: Migration = async ({ context: queryInterface}) => {
    await queryInterface.createTable(tableDefinition as TableName, columnDefinition)
}