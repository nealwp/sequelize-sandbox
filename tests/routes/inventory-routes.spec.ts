import supertest from 'supertest'
import router from '../../src/routes/inventory.routes'
import { Express } from 'express-serve-static-core'
import { createServer } from '../../src/server'
import { inventory } from '../../src/controllers'
import { InventoryCreationAttributes } from '../../src/@types/inventory.types'

let server: Express;

beforeAll(() => {
    server = createServer(router)
})

describe('inventory routes', () => {
 
    describe('GET /', () => {      
        test('should return 200 and an array of inventories', async () => {
            inventory.findAll = jest.fn().mockResolvedValue(['found some records'])
            
            await supertest(server)
                .get('/')
                .expect(200)
                .then(res => {
                    expect(res.body.length).toBeGreaterThan(0)
                })
        })

        test('should return 204 when no inventories exist', async () => {            
            inventory.findAll = jest.fn().mockResolvedValue([]) 
            
            await supertest(server)
                .get('/')
                .expect(204)
        })
    })
    
    describe('GET /:id', () => {    
        test('should return 200 and inventory matching id', async () => {
            
            const inventoryId = 1234
            inventory.findById = jest.fn().mockResolvedValue({id: inventoryId})
            
            await supertest(server)
                .get(`/${inventoryId}`)
                .expect(200)
                .then(res => {
                    expect(res.body).toMatchObject({id: inventoryId})
                })
        })

        test('should return 404 if inventory is not found', async () => {
            const inventoryId = 5
            inventory.findById = jest.fn().mockRejectedValue('that didnt work')
            const expectedError = `inventory with id ${inventoryId} not found`
            
            await supertest(server)
                .get(`/${inventoryId}`)
                .expect(404)
                .then(res => {
                    expect((res.error as any).text).toEqual(expectedError)
                })
        })
    })

    describe('POST /', () => {
        test('should return 201 and created inventory', async () => {
            
            const newInventory: InventoryCreationAttributes = {
                characterId: 1234
            }

            inventory.create = jest.fn().mockResolvedValue({id: 0, ...newInventory})            

            await supertest(server)
                .post(`/`)
                .send(newInventory)
                .expect(201)
                .then(res => {
                    expect(res.body).toEqual({id: 0, ...newInventory})
                })
        })

        test('should return 500 if error occures', async () => {
            
            const newInventory: InventoryCreationAttributes = {
                characterId: 1234
            }

            inventory.create = jest.fn().mockRejectedValue('that didnt work')            

            const expectedError = `error creating inventory for character ${newInventory.characterId}`

            await supertest(server)
                .post(`/`)
                .send(newInventory)
                .expect(500)
                .then(res => {
                    expect((res.error as any).text).toEqual(expectedError)
                })
        })
    })
})