import * as db from '../../src/db'
import { CharacterAttributes, CharacterCreationAttributes } from "../../src/@types/character.types"
import { characters } from "../../src/controllers"
import { Character } from '../../src/models'
import { QueryTypes } from 'sequelize'

describe('character controller', () => {
    beforeAll(async () => {
        await db.initialize()
    })
    beforeEach(async () => {
        await db.client.query('TRUNCATE TABLE characters RESTART IDENTITY CASCADE')
    })
    describe('create', () => {
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
})