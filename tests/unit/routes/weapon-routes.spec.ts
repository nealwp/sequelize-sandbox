import supertest from 'supertest'
import router from '../../../src/routes/weapon.routes'
import { Express } from 'express-serve-static-core'
import { createServer } from '../../../src/server'
import { weapons } from '../../../src/controllers'
import { WeaponCreationAttributes } from '../../../src/models/weapon.model'

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
            weapons.findById = jest.fn().mockRejectedValue('that didnt work')
            const expectedError = `weapon with id ${weaponId} not found`
            
            await supertest(server)
                .get(`/${weaponId}`)
                .expect(404)
                .then(res => {
                    expect((res.error as any).text).toEqual(expectedError)
                })
        })
    })

    describe('POST /', () => {
        test('should return 201 and created weapon', async () => {
            
            const newWeapon: WeaponCreationAttributes = {
                name: 'name',
                damage: 100,
                type: 'melee'
            }

            weapons.create = jest.fn().mockResolvedValue({id: 0, ...newWeapon})            

            await supertest(server)
                .post(`/`)
                .send(newWeapon)
                .expect(201)
                .then(res => {
                    expect(res.body).toEqual({id: 0, ...newWeapon})
                })
        })

        test('should return 500 if request errors', async () => {
            
            const newWeapon: WeaponCreationAttributes = {
                name: 'name',
                damage: 100,
                type: 'melee'
            }

            weapons.create = jest.fn().mockRejectedValue('that didnt work')
            
            const expectedError = `error creating weapon ${JSON.stringify(newWeapon)}`

            await supertest(server)
                .post(`/`)
                .send(newWeapon)
                .expect(500)
                .then(res => {
                    expect((res.error as any).text).toEqual(expectedError)
                })
        })
    })

    describe('POST /inventory', () => {
        test('should return 200 and updated weapon', async () => {
            
            const weaponAndInventory = { id: 0, inventoryId: 1234 }

            weapons.addToInventory = jest.fn().mockResolvedValue(weaponAndInventory)            

            await supertest(server)
                .post(`/inventory`)
                .send(weaponAndInventory)
                .expect(200)
                .then(res => {
                    expect(res.body).toEqual(weaponAndInventory)
                })
        })

        test('should return 500 if request errors', async () => {
            
            const weaponAndInventory = { id: 0, inventoryId: 1234 }

            weapons.addToInventory = jest.fn().mockRejectedValue('that didnt work')
            
            const expectedError = `error adding weapon ${weaponAndInventory.id} to inventory ${weaponAndInventory.inventoryId}`

            await supertest(server)
                .post(`/inventory`)
                .send(weaponAndInventory)
                .expect(500)
                .then(res => {
                    expect((res.error as any).text).toEqual(expectedError)
                })
        })
    })
})