import supertest from 'supertest'
import router from '../../src/routes/weapon.routes'
import { Express } from 'express-serve-static-core'
import { createServer } from '../../src/server'
import { weapons } from '../../src/controllers'
import { WeaponCreationAttributes } from '../../src/@types/weapon.types'

let server: Express;

beforeAll(() => {
    server = createServer(router)
})

describe('weapon routes', () => {
    describe('GET /', () => {
        test('should return a 200 and an array of weapons', async () => {
            weapons.findAll = jest.fn().mockResolvedValue(['found some records'])
            
            await supertest(server)
                .get('/')
                .expect(200)
                .then(res => {
                    expect(res.body.length).toBeGreaterThan(0)
                })
        })

        test('should return 204 when no weapons exist', async () => {            
            weapons.findAll = jest.fn().mockResolvedValue([]) 
            
            await supertest(server)
                .get('/')
                .expect(204)
        })
    })
})