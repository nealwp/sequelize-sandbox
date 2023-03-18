import * as db from '../../src/db'
import { characters } from "../../src/controllers"
import { Character, CharacterAttributes, CharacterCreationAttributes } from '../../src/models/character.model'
import { QueryTypes } from 'sequelize'
import { faker } from '@faker-js/faker'
import { insertOneCharacterSql, selectCharacterByIdSql, truncateCharacterSql } from './helpers/sql'

describe('character controller', () => {
    beforeAll(async () => {
        await db.initialize()
        await db.client.query(truncateCharacterSql)
    })

    afterAll(async () => {
        await db.client.query(truncateCharacterSql)
    })
    
    describe('create', () => {
        
        beforeEach(async () => {
            await db.client.query(truncateCharacterSql)
        })

        afterEach(async () => {
            await db.client.query(truncateCharacterSql)
        })

        test('should create a new character', async () => {
            const character: CharacterCreationAttributes = {
                name: faker.name.fullName(),
                age: faker.datatype.number({min: 0, max: 100}),
            }
             
            const result = await characters.create(character)
            
            expect(result).toMatchObject<Partial<Character>>({
                id: expect.any(Number),
                name: character.name,
                age: character.age,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            })

            const [ dbContents ] = await db.client.query(selectCharacterByIdSql, {
                replacements: { id: result.id },
                mapToModel: true,
                model: Character,
                type: QueryTypes.SELECT
            })
            expect(dbContents.dataValues).toEqual(result.toJSON()) 
        })
    })

    describe('update', () => {
        
        beforeEach(async () => {
            await db.client.query(truncateCharacterSql)
        })

        afterEach(async () => {
            await db.client.query(truncateCharacterSql)
        })
    
        test('should update an existing character', async () => {
            
            const character: Partial<Character> = {
                id: faker.datatype.number({precision: 1}),
                name: faker.name.fullName(),
                age: faker.datatype.number({min: 0, max: 100}),
                createdAt: faker.date.past(),
                updatedAt: faker.date.past(),
            }
            
            await db.client.query(insertOneCharacterSql, {
                replacements: character,
                type: QueryTypes.INSERT
            })

            const updatedCharacter: CharacterAttributes = {
                id: character.id as number,
                name:  faker.name.fullName(),
                age: faker.datatype.number({min: 0, max: 100}),
                createdAt: new Date(), 
                updatedAt: new Date()
            }

            const result = await characters.update(updatedCharacter)
            expect(result).toMatchObject<Partial<Character>>({
                id: character.id,
                name: updatedCharacter.name,
                age: updatedCharacter.age,
                createdAt: character.createdAt,  // createdAt should not change
                updatedAt: expect.any(Date)      // updatedAt will be determined by Sequelize
            })

            const [ dbContents ] = await db.client.query<Character>(selectCharacterByIdSql, {
                replacements: { id: character.id },
                mapToModel: true,
                model: Character,
                type: QueryTypes.SELECT
            })
            expect(dbContents.dataValues).toEqual(result.toJSON())
        })
    })

    describe('findById', () => {
        beforeEach(async () => {
            await db.client.query(truncateCharacterSql)
        })

        afterEach(async () => {
            await db.client.query(truncateCharacterSql)
        })

        test('should find an existing character for a matching id', async () => {
            
            const characterId = faker.datatype.number({precision: 1})

            const character: Partial<Character> = {
                id: characterId,
                name: faker.name.fullName(),
                age: faker.datatype.number({min: 0, max: 100}),
                createdAt: faker.date.past(),
                updatedAt: faker.date.past()
            }
            
            await db.client.query(insertOneCharacterSql, {
                replacements: character,
                type: QueryTypes.INSERT
            })

            const result = await characters.findById(characterId)
            expect(result).toMatchObject<Partial<Character>>({
                id: character.id,
                name: character.name,
                age: character.age,
                inventory: expect.any(Array),
                createdAt: character.createdAt,
                updatedAt: character.updatedAt
            })
        })
    })

    describe('findAll', () => {
        
        beforeEach(async () => {
            await db.client.query(truncateCharacterSql)
        })

        afterEach(async () => {
            await db.client.query(truncateCharacterSql)
        })

        test('should find all characters in the database', async () => {
            
            const characterRecords = Array.from({length: 10}, () => {
                const character: Partial<Character> = {
                    id: faker.datatype.number({precision: 1}),
                    name: faker.name.fullName(),
                    age: faker.datatype.number({min: 0, max: 100}),
                    createdAt: faker.date.past(),
                    updatedAt: faker.date.past()
                }
                return character
            })
            
            for (const character of characterRecords) {
                const insertCharacterSql = `
                    insert into character (id, name, age)
                    values (${character.id}, '${character.name}', ${character.age}) 
                `
                await db.client.query(insertCharacterSql, {type: QueryTypes.INSERT})
            }

            const result = await characters.findAll()
            expect(result).toHaveLength(characterRecords.length)
        })
    })
})