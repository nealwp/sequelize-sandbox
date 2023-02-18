import supertest from 'supertest'
import { Express } from 'express-serve-static-core'
import { createServer } from '../../src/server'
import characterRouter from '../../src/routes/character.routes'

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
                    expect(res.body).toMatchObject({})
                })
        })
    })
})