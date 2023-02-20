import * as db from '../../src/db'
import { CharacterAttributes, CharacterCreationAttributes } from "../../src/@types/character.types"
import { characters } from "../../src/controllers"
import { Character } from '../../src/models'
import { QueryTypes } from 'sequelize'

describe('character controller', () => {
    beforeAll(async () => {
        await db.initialize()
    })
    
    describe('create', () => {
        
        beforeEach(async () => {
            await db.client.query('TRUNCATE TABLE characters RESTART IDENTITY CASCADE')
        })

        test('should create a new character', async () => {
            const character: CharacterCreationAttributes = {
                name: 'character name',
                age: 21
            }
             
            const result = await characters.create(character)
            expect(result).toMatchObject<Partial<Character>>({
                id: expect.any(Number),
                name: 'character name',
                age: 21,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            })

            const [ dbContents ] = await db.client.query(`select * from characters where id = ${result.id}`, {type: QueryTypes.SELECT})
            expect(dbContents).toEqual(result.toJSON()) 
        })
    })

    describe('update', () => {
        
        beforeEach(async () => {
            await db.client.query('TRUNCATE TABLE characters RESTART IDENTITY CASCADE')
        })

        test('should update an existing character', async () => {
            
            const character: Partial<Character> = {
                id: 1234,
                name: 'character name',
                age: 21,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            
            const insertCharacterSql = `
                insert into characters (id, name, age, "createdAt", "updatedAt")
                values (${character.id}, '${character.name}', ${character.age}, '${character.createdAt}', '${character.updatedAt}') 
            `
            await db.client.query(insertCharacterSql, {type: QueryTypes.INSERT})

            const updatedCharacter: CharacterAttributes = {
                id: 1234,
                name: 'character name updated',
                age: 32,
            }

            const result = await characters.update(updatedCharacter)
            expect(result).toMatchObject<Partial<Character>>({
                id: character.id,
                name: updatedCharacter.name,
                age: updatedCharacter.age,
                createdAt: new Date(character.createdAt),
                updatedAt: expect.any(Date)
            })

            const [ dbContents ] = await db.client.query(`select * from characters where id = ${character.id}`, {type: QueryTypes.SELECT})
            expect(dbContents).toEqual(result.toJSON())
        })
    })

    describe('findById', () => {
        beforeEach(async () => {
            await db.client.query('TRUNCATE TABLE characters RESTART IDENTITY CASCADE')
        })

        test('should find an existing character for a matching id', async () => {
            
            const characterId = 31415

            const character: Partial<Character> = {
                id: characterId,
                name: 'findById character name',
                age: 37,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            
            const insertCharacterSql = `
                insert into characters (id, name, age, "createdAt", "updatedAt")
                values (${character.id}, '${character.name}', ${character.age}, '${character.createdAt}', '${character.updatedAt}') 
            `
            await db.client.query(insertCharacterSql, {type: QueryTypes.INSERT})

            const result = await characters.findById(characterId)
            expect(result).toMatchObject<Partial<Character>>({
                id: character.id,
                name: character.name,
                age: character.age,
                inventory: expect.any(Array),
                createdAt: new Date(character.createdAt),
                updatedAt: new Date(character.updatedAt)
            })
        })
    })
})