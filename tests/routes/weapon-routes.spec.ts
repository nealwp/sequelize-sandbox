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

    describe('GET /:id', () => {    
        test('should return 200 and weapon matching id', async () => {
            
            const weaponId = 1234
            weapons.findById = jest.fn().mockResolvedValue({id: weaponId})
            
            await supertest(server)
                .get(`/${weaponId}`)
                .expect(200)
                .then(res => {
                    expect(res.body).toMatchObject({id: weaponId})
                })
        })

        test('should return 404 if weapon is not found', async () => {
            const weaponId = 5
            weapons.findById = jest.fn().mockRejectedValue({})
            const expectedError = `weapon with id ${weaponId} not found`
            
            await supertest(server)
                .get(`/${weaponId}`)
                .expect(404)
                .then(res => {
                    expect((res.error as any).text).toEqual(expectedError)
                })
        })
    })
})