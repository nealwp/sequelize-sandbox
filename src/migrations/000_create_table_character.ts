import { columnDefinition, tableDefinition } from '../models/character.model'
import type { Migration } from '../db'

export const up: Migration = async ({ context: queryInterface}) => {
    await queryInterface.createTable(tableDefinition, columnDefinition)
}