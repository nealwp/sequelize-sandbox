import supertest from 'supertest'
import characterRouter from '../../src/routes/character.routes'
import { Express } from 'express-serve-static-core'
import { createServer } from '../../src/server'
import { characters } from '../../src/controllers'
import { CharacterAttributes, CharacterCreationAttributes } from '../../src/@types/character.types'
import { Character } from '../../src/models'

const characterRecords: CharacterAttributes[] = [
    { id: 0, name: 'name 0', age: 20 },
    { id: 1, name: 'name 1', age: 21 },
    { id: 2, name: 'name 2', age: 22 },
    { id: 3, name: 'name 3', age: 23 },
]

characters.findAll = jest.fn().mockResolvedValue(characterRecords)
characters.findById = jest.fn(async (id: number) => {
    const character = characterRecords.find(character => character.id === id)
    if(character){
        return character as Character
    } else {
        throw new Error('not found')
    }
})
characters.create = jest.fn(async (character: CharacterCreationAttributes) => {
    const createdCharacter = {
        id: 0, 
        ...character
    }
    return createdCharacter as Character
})

let server: Express;

beforeAll(() => {
    server = createServer(characterRouter)
})

describe('character routes', () => {
    
    describe('GET /', () => {
        test('should return 200 and all characters', async () => {
            await supertest(server)
                .get('/')
                .expect(200)
                .then(res => {
                    expect(res.body).toEqual(characterRecords)
                })
        })
    })
    
    describe('GET /:id', () => {    
        test('should return 200 and character matching id', async () => {
            const characterId = 1
            await supertest(server)
                .get(`/${characterId}`)
                .expect(200)
                .then(res => {
                    expect(res.body).toEqual(characterRecords[characterId])
                })
        })

        test('should return 404 if character is not found', async () => {
            const characterId = 5
            const expectedError = `character with id ${characterId} not found`
            await supertest(server)
                .get(`/${characterId}`)
                .expect(404)
                .then(res => {
                    expect((res.error as any).text).toEqual(expectedError)
                })
        })
    })

    describe('POST /', () => {
        test('should return 201 and created character', async () => {
            const newCharacter: CharacterCreationAttributes = {
                name: 'name',
                age: 20
            }

            const expectedResponse = {
                id:  0,
                name: 'name',
                age: 20
            }

            await supertest(server)
                .post(`/`)
                .send(newCharacter)
                .expect(201)
                .then(res => {
                    expect(res.body).toEqual(expectedResponse)
                })
        })
    })
})