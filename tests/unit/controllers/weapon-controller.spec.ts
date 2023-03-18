import { WeaponCreationAttributes } from "../../../src/models/weapon.model"
import { weapons } from "../../../src/controllers"
import { Weapon } from "../../../src/models"

describe('weapons controller', () => {
    describe('create', () => {
        test('should return the created weapon', async () => {
            const newWeapon: WeaponCreationAttributes = { 
                name: 'weapon name',
                damage: 100,
                type: 'melee'
            }

            Weapon.create = jest.fn().mockResolvedValue({id: 0, ...newWeapon})

            const result = await weapons.create(newWeapon)
            expect(result).toEqual({id: 0, ...newWeapon})
        })
    })

    describe('update', () => {
        test('should throw an error if weapon does not exist', async () => {
            const updatedWeapon = <Weapon>{id: 9999}

            Weapon.findOne = jest.fn().mockResolvedValue(null)

            await expect(
                async () => await weapons.update(updatedWeapon)
            ).rejects.toThrow(`Weapon id ${updatedWeapon.id} not found!`)
        })

        test('should return updated weapon if update is successful', async () => {
            const updatedWeapon = <Weapon>{
                id: 0,
                name: 'updated weapon name',
                damage: 110,
                type: 'ranged'
            }

            Weapon.findOne = jest.fn().mockResolvedValue({update: () => updatedWeapon})
            
            const result = await weapons.update(updatedWeapon)
            expect(result).toEqual(updatedWeapon)
        })
    })

    describe('findById', () => {
        test('should throw an error if inventory does not exist', async () => {
            const weaponId = 9999

            Weapon.findOne = jest.fn().mockResolvedValue(null)

            await expect(
                async () => await weapons.findById(weaponId)
            ).rejects.toThrow(`Weapon id ${weaponId} not found!`)
        })

        test('should return a weapon if found', async () => {
            const weaponId = 0

            Weapon.findOne = jest.fn().mockResolvedValue({id: weaponId})

            const result = await weapons.findById(weaponId)

            expect(result).toEqual({id: weaponId})
        })
    })

    describe('findAll', () => {
        test('should return an array of weapons', async () => {
            Weapon.findAll = jest.fn().mockResolvedValue(['found some weapons'])

            const result = await weapons.findAll()

            expect(result.length).toBeGreaterThan(0)
        })
    })

    describe('addToInventory', () => {
        test('should throw an error if weapon is not found', async () => {
            
            const weaponId = 9999
            const inventoryId = 0
            
            Weapon.findOne = jest.fn().mockResolvedValue(null)
            
            await expect(
                async () => await weapons.addToInventory(weaponId, inventoryId)
            ).rejects.toThrow(`Weapon id ${weaponId} not found!`)
        })

        test('should return weapon with added inventory id', async () => {
            const weaponId = 0
            const inventoryId = 0

            Weapon.findOne = jest.fn().mockResolvedValue({
                update: () => <Weapon>{ id: weaponId, inventoryId }
            })

            const result = await weapons.addToInventory(weaponId, inventoryId)
            expect(result).toEqual({id: weaponId, inventoryId})
        })
    })
})