import * as db from '../../src/db'
import { InventoryAttributes, InventoryCreationAttributes } from "../../src/models/inventory.model"
import { inventory } from "../../src/controllers"
import { Character, Inventory } from '../../src/models'
import { QueryTypes } from 'sequelize'
import { faker } from '@faker-js/faker'

describe('inventory controller', () => {
    beforeAll(async () => {
        await db.initialize()
        await db.client.query('TRUNCATE TABLE inventory RESTART IDENTITY CASCADE')
        await db.client.query('TRUNCATE TABLE characters RESTART IDENTITY CASCADE')
    })

    afterAll(async () => {
        await db.client.query('TRUNCATE TABLE inventory RESTART IDENTITY CASCADE')
        await db.client.query('TRUNCATE TABLE characters RESTART IDENTITY CASCADE')
    })
    
    describe('create', () => {
        
        beforeEach(async () => {
            await db.client.query('TRUNCATE TABLE inventory RESTART IDENTITY CASCADE')

            const character: Partial<Character> = {
                id: 1234,
                name: faker.name.fullName(),
                age: faker.datatype.number({min: 0, max: 100}),
                createdAt: faker.date.past().toISOString(),
                updatedAt: faker.date.past().toISOString(),
            }
            
            const insertCharacterSql = `
                insert into characters (id, name, age, "createdAt", "updatedAt")
                values (${character.id}, '${character.name}', ${character.age}, '${character.createdAt}', '${character.updatedAt}') 
            `
            await db.client.query(insertCharacterSql, {type: QueryTypes.INSERT})
        })

        afterEach(async () => {
            await db.client.query('TRUNCATE TABLE characters RESTART IDENTITY CASCADE')
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

            const [ dbContents ] = await db.client.query(`select * from inventory where id = ${result.id}`, {type: QueryTypes.SELECT})
            expect(dbContents).toEqual(result.toJSON()) 
        })
    })

    describe('update', () => {
        
        beforeEach(async () => {
            await db.client.query('TRUNCATE TABLE inventory RESTART IDENTITY CASCADE')
            await db.client.query('TRUNCATE TABLE characters RESTART IDENTITY CASCADE')

            const characterOne: Partial<Character> = { id: 1234 }
            const characterTwo: Partial<Character> = { id: 5678 }
            
            const insertCharactersSql = `
                insert into characters (id, "createdAt", "updatedAt") 
                values 
                    (${characterOne.id}, '${new Date().toISOString()}', '${new Date().toISOString()}'),
                    (${characterTwo.id}, '${new Date().toISOString()}', '${new Date().toISOString()}')
                     
            `
            await db.client.query(insertCharactersSql, {type: QueryTypes.INSERT})
        })

        afterEach(async () => {
            await db.client.query('TRUNCATE TABLE characters RESTART IDENTITY CASCADE')
            await db.client.query('TRUNCATE TABLE inventory RESTART IDENTITY CASCADE')
        })

        test('should update an existing inventory', async () => {
            
            const newInventory: Partial<Inventory> = {
                id: faker.datatype.number({precision: 1}),
                characterId: 1234,
                createdAt: faker.date.past().toISOString(),
                updatedAt: faker.date.past().toISOString(),
            }
            
            const insertInventorySql = `
                insert into inventory (id, "characterId", "createdAt", "updatedAt")
                values (${newInventory.id}, ${newInventory.characterId}, '${newInventory.createdAt}', '${newInventory.updatedAt}') 
            `
            await db.client.query(insertInventorySql, {type: QueryTypes.INSERT})

            const updatedInventory: InventoryAttributes = {
                id: newInventory.id as number,
                characterId: 5678,
            }

            const result = await inventory.update(updatedInventory)
            expect(result).toMatchObject<Partial<Inventory>>({
                id: newInventory.id,
                characterId: updatedInventory.characterId,
                createdAt: new Date(newInventory.createdAt),
                updatedAt: expect.any(Date)
            })

            const [ dbContents ] = await db.client.query(`select * from inventory where id = ${newInventory.id}`, {type: QueryTypes.SELECT})
            expect(dbContents).toEqual(result.toJSON())
        })
    })

    describe('findById', () => {
        
        beforeEach(async () => {
            await db.client.query('TRUNCATE TABLE inventory RESTART IDENTITY CASCADE')
            await db.client.query('TRUNCATE TABLE characters RESTART IDENTITY CASCADE')

            const characterOne: Partial<Character> = { id: 1234 }
            
            const insertCharactersSql = `
                insert into characters (id, "createdAt", "updatedAt") 
                values 
                    (${characterOne.id}, '${new Date().toISOString()}', '${new Date().toISOString()}')         
            `
            await db.client.query(insertCharactersSql, {type: QueryTypes.INSERT})
        })

        afterEach(async () => {
            await db.client.query('TRUNCATE TABLE characters RESTART IDENTITY CASCADE')
            await db.client.query('TRUNCATE TABLE inventory RESTART IDENTITY CASCADE')
        })

        test('should find an existing inventory for a matching id', async () => {
            
            const inventoryId = faker.datatype.number({precision: 1})

            const newInventory: Partial<Inventory> = {
                id: inventoryId,
                characterId: 1234,
                createdAt: faker.date.past().toISOString(),
                updatedAt: faker.date.past().toISOString()
            }
            
            const insertInventorySql = `
                insert into inventory (id, "characterId", "createdAt", "updatedAt")
                values (${newInventory.id}, ${newInventory.characterId}, '${newInventory.createdAt}', '${newInventory.updatedAt}') 
            `
            await db.client.query(insertInventorySql, {type: QueryTypes.INSERT})

            const result = await inventory.findById(inventoryId)
            expect(result).toMatchObject<Partial<Inventory>>({
                id: newInventory.id,
                characterId: newInventory.characterId,
                createdAt: new Date(newInventory.createdAt),
                updatedAt: new Date(newInventory.updatedAt)
            })
        })
    })

    describe('findAll', () => {
        
        beforeEach(async () => {
            await db.client.query('TRUNCATE TABLE inventory RESTART IDENTITY CASCADE')
            await db.client.query('TRUNCATE TABLE characters RESTART IDENTITY CASCADE')

            const characterRecords = Array.from({length: 10}, (elem, index) => {
                const character: Partial<Character> = { id: index }
                return character
            })

            for (const record of characterRecords) {
                const insertCharacterSql = `
                    insert into characters (id, "createdAt", "updatedAt") 
                    values (${record.id}, '${new Date().toISOString()}', '${new Date().toISOString()}')         
                `
                await db.client.query(insertCharacterSql, {type: QueryTypes.INSERT})
            }
            
        })

        afterEach(async () => {
            await db.client.query('TRUNCATE TABLE characters RESTART IDENTITY CASCADE')
            await db.client.query('TRUNCATE TABLE inventory RESTART IDENTITY CASCADE')
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
                    insert into inventory (id, "characterId", "createdAt", "updatedAt")
                    values (${record.id}, ${record.characterId}, '${new Date().toISOString()}', '${new Date().toISOString()}') 
                `
                await db.client.query(insertInventorySql, {type: QueryTypes.INSERT})
            }
            
            const result = await inventory.findAll()
            expect(result).toHaveLength(10)
        })
    })
})