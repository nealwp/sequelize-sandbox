import * as db from '../../src/db'
import { InventoryAttributes, InventoryCreationAttributes } from "../../src/models/inventory.model"
import { inventory } from "../../src/controllers"
import { Character, Inventory } from '../../src/models'
import { QueryTypes } from 'sequelize'
import { faker } from '@faker-js/faker'
import { insertOneCharacterSql, insertOneInventorySql, selectInventoryByIdSql, truncateCharacterSql, truncateInventorySql } from './helpers/sql'

describe('inventory controller', () => {
    beforeAll(async () => {
        await db.initialize()
        await db.client.query(truncateInventorySql)
        await db.client.query(truncateCharacterSql)
    })

    afterAll(async () => {
        await db.client.query(truncateInventorySql)
        await db.client.query(truncateCharacterSql)
    })
    
    describe('create', () => {
        
        beforeEach(async () => {
            await db.client.query(truncateInventorySql)

            const character: Partial<Character> = {
                id: 1234,
                name: faker.name.fullName(),
                age: faker.datatype.number({min: 0, max: 100}),
                createdAt: faker.date.past(),
                updatedAt: faker.date.past(),
            }
            
            await db.client.query(insertOneCharacterSql, {
                replacements: character,
                type: QueryTypes.INSERT
            })
        })

        afterEach(async () => {
            await db.client.query(truncateCharacterSql)
        })

        test('should create a new inventory', async () => {
            const newInventory: InventoryCreationAttributes = {
                characterId: 1234
            }
             
            const result = await inventory.create(newInventory)
            
            expect(result).toMatchObject<Partial<Inventory>>({
                id: expect.any(Number),
                characterId: newInventory.characterId,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            })

            const [ dbContents ] = await db.client.query(selectInventoryByIdSql, {
                replacements: {id: result.id},
                model: Inventory,
                mapToModel: true,
                type: QueryTypes.SELECT
            })
            expect(dbContents.dataValues).toEqual(result.toJSON()) 
        })
    })

    describe('update', () => {
        
        beforeEach(async () => {
            await db.client.query(truncateInventorySql)
            await db.client.query(truncateCharacterSql)

            const characterOne: Partial<Character> = { id: 1234 }
            const characterTwo: Partial<Character> = { id: 5678 }
            
            const insertCharactersSql = `
                insert into character (id) 
                values 
                    (${characterOne.id}),
                    (${characterTwo.id})
                     
            `
            await db.client.query(insertCharactersSql, {type: QueryTypes.INSERT})
        })

        afterEach(async () => {
            await db.client.query(truncateCharacterSql)
            await db.client.query(truncateInventorySql)
        })

        test('should update an existing inventory', async () => {
            
            const newInventory: Partial<Inventory> = {
                id: faker.datatype.number({precision: 1}),
                characterId: 1234,
                createdAt: faker.date.past(),
                updatedAt: faker.date.past(),
            }

            await db.client.query(insertOneInventorySql, {
                replacements: newInventory,
                type: QueryTypes.INSERT
            })

            const updatedInventory: InventoryAttributes = {
                id: newInventory.id as number,
                characterId: 5678,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            const result = await inventory.update(updatedInventory)
            expect(result).toMatchObject<Partial<Inventory>>({
                id: newInventory.id,
                characterId: updatedInventory.characterId,
                createdAt: newInventory.createdAt,
                updatedAt: expect.any(Date)
            })

            const [ dbContents ] = await db.client.query(selectInventoryByIdSql, {
                replacements: {id: result.id},
                mapToModel: true,
                model: Inventory,
                type: QueryTypes.SELECT
            })
            expect(dbContents.dataValues).toEqual(result.toJSON())
        })
    })

    describe('findById', () => {
        
        beforeEach(async () => {
            await db.client.query(truncateInventorySql)
            await db.client.query(truncateCharacterSql)

            const characterOne: Partial<Character> = { id: 1234 }
            
            const insertCharactersSql = `
                insert into character (id) 
                values 
                    (${characterOne.id})         
            `
            await db.client.query(insertCharactersSql, {type: QueryTypes.INSERT})
        })

        afterEach(async () => {
            await db.client.query(truncateCharacterSql)
            await db.client.query(truncateInventorySql)
        })

        test('should find an existing inventory for a matching id', async () => {
            
            const inventoryId = faker.datatype.number({precision: 1})

            const newInventory: Partial<Inventory> = {
                id: inventoryId,
                characterId: 1234,
                createdAt: faker.date.past(),
                updatedAt: faker.date.past()
            }
            
            const insertInventorySql = `
                insert into inventory (id, character_id, created_at, updated_at)
                values (:id, :characterId, :createdAt, :updatedAt) 
            `
            await db.client.query(insertInventorySql, {
                replacements: newInventory,
                type: QueryTypes.INSERT
            })

            const result = await inventory.findById(inventoryId)
            expect(result).toMatchObject<Partial<Inventory>>({
                id: newInventory.id,
                characterId: newInventory.characterId,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            })
        })
    })

    describe('findAll', () => {
        
        beforeEach(async () => {
            await db.client.query(truncateInventorySql)
            await db.client.query(truncateCharacterSql)

            const characterRecords = Array.from({length: 10}, (elem, index) => {
                const character: Partial<Character> = { id: index }
                return character
            })

            for (const record of characterRecords) {
                const insertCharacterSql = `
                    insert into character (id) 
                    values (${record.id})         
                `
                await db.client.query(insertCharacterSql, {type: QueryTypes.INSERT})
            }
            
        })

        afterEach(async () => {
            await db.client.query(truncateCharacterSql)
            await db.client.query(truncateInventorySql)
        })

        test('should find all inventory in the database', async () => {          
            
            const inventoryRecords = Array.from({length: 10}, (elem, index) => {
                const inventoryRecord: Partial<Inventory> = {
                    id: index * 10,
                    characterId: index,
                }
                return inventoryRecord
            })
            
            for (const record of inventoryRecords) {
                const insertInventorySql = `
                    insert into inventory (id, character_id)
                    values (${record.id}, ${record.characterId}) 
                `
                await db.client.query(insertInventorySql, {type: QueryTypes.INSERT})
            }
            
            const result = await inventory.findAll()
            expect(result).toHaveLength(10)
        })
    })
})