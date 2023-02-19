import { InventoryCreationAttributes } from "../../src/@types/inventory.types"
import { inventory } from "../../src/controllers"
import { Inventory } from "../../src/models"

describe('inventory controller', () => {
    describe('create', () => {
        test('should return the created character', async () => {
            const newInventory: InventoryCreationAttributes = { characterId: 0 }

            Inventory.create = jest.fn().mockResolvedValue({id: 0, ...newInventory})

            const result = await inventory.create(newInventory)
            expect(result).toEqual({id: 0, ...newInventory})
        })
    })

    describe('update', () => {
        test('should throw an error if inventory does not exist', async () => {
            const updatedInventory = <Inventory>{id: 9999}

            Inventory.findOne = jest.fn().mockResolvedValue(null)

            await expect(
                async () => await inventory.update(updatedInventory)
            ).rejects.toThrow(`Inventory id ${updatedInventory.id} not found!`)
        })

        test('should return updated inventory if update is successful', async () => {
            const updatedInventory = <Inventory>{id: 0, characterId: 0}

            Inventory.findOne = jest.fn().mockResolvedValue({update: () => updatedInventory})
            
            const result = await inventory.update(updatedInventory)
            expect(result).toEqual(updatedInventory)
        })
    })

    describe('findById', () => {
        test('should throw an error if inventory does not exist', async () => {
            const inventoryId = 9999

            Inventory.findOne = jest.fn().mockResolvedValue(null)

            await expect(
                async () => await inventory.findById(inventoryId)
            ).rejects.toThrow(`Inventory id ${inventoryId} not found!`)
        })

        test('should return a inventory if found', async () => {
            const inventoryId = 0

            Inventory.findOne = jest.fn().mockResolvedValue({id: inventoryId})

            const result = await inventory.findById(inventoryId)

            expect(result).toEqual({id: inventoryId})
        })
    })

    describe('findAll', () => {
        test('should return an array of inventory', async () => {
            Inventory.findAll = jest.fn().mockResolvedValue(['found some inventory'])

            const result = await inventory.findAll()

            expect(result.length).toBeGreaterThan(0)
        })
    })
})