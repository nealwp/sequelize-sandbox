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
        test('should update an existing character', async () => {
            
            const character: Partial<Character> = {
                id: 1234,
                name: 'character name',
                age: 21,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            
            const insertCharacter = `
                insert into characters (id, name, age, createdAt, updatedAt)
                values ('${character.id}, ${character.name}', ${character.age}, ${character.createdAt}, ${character.updatedAt}) 
            `
            await db.client.query(insertCharacter, {type: QueryTypes.INSERT})

            const updatedCharacter: CharacterAttributes = {
                id: 1234,
                name: 'character name updated',
                age: 32,
            }

            const result = await characters.update(updatedCharacter)
            expect(result).toEqual('hey hey the working man')
        })
    })
})