import supertest from 'supertest'
import router from '../../../src/routes/character.routes'
import { Express } from 'express-serve-static-core'
import { createServer } from '../../../src/server'
import { characters } from '../../../src/controllers'
import { CharacterCreationAttributes } from '../../../src/@types/character.types'

let server: Express;

beforeAll(() => {
    server = createServer(router)
})

describe('character routes', () => {
 
    describe('GET /', () => {      
        test('should return 200 and an array of characters', async () => {
            characters.findAll = jest.fn().mockResolvedValue(['found some records'])
            
            await supertest(server)
                .get('/')
                .expect(200)
                .then(res => {
                    expect(res.body.length).toBeGreaterThan(0)
                })
        })

        test('should return 204 when no characters exist', async () => {            
            characters.findAll = jest.fn().mockResolvedValue([]) 
            
            await supertest(server)
                .get('/')
                .expect(204)
        })
    })
    
    describe('GET /:id', () => {    
        test('should return 200 and character matching id', async () => {
            
            const characterId = 1234
            characters.findById = jest.fn().mockResolvedValue({id: characterId})
            
            await supertest(server)
                .get(`/${characterId}`)
                .expect(200)
                .then(res => {
                    expect(res.body).toMatchObject({id: characterId})
                })
        })

        test('should return 404 if character is not found', async () => {
            const characterId = 5
            characters.findById = jest.fn().mockRejectedValue('that didnt work')
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

            characters.create = jest.fn().mockResolvedValue({id: 0, ...newCharacter})            

            await supertest(server)
                .post(`/`)
                .send(newCharacter)
                .expect(201)
                .then(res => {
                    expect(res.body).toEqual({id: 0, ...newCharacter})
                })
        })
    })
})