import * as db from './db'
import * as controller from './controllers'
import { CharacterCreationAttributes } from './@types/character.types'
import { MELEE, WeaponCreationAttributes } from './@types/weapon.types'
import { InventoryCreationAttributes } from './@types/inventory.types'

const newCharacter: CharacterCreationAttributes = {
    name: 'Luke Skywalker',
    age: 27
}

const newWeapon: WeaponCreationAttributes = {
    name: 'lightsaber',
    damage: 100,
    type: MELEE
}

const loadData = async () => {
    const luke = await controller.characters.create(newCharacter)
    const lightsaber = await controller.weapons.create(newWeapon)
    const lukeInventory = await controller.inventories.create({characterId: luke.id})
    lightsaber.inventoryId = lukeInventory.id
    await controller.weapons.update(lightsaber)

    const results = await controller.characters.getAll()
    results.forEach(result => {
        const name = result.name
        const id = result.id
        const inventory = JSON.stringify(result.inventory)

        console.log(`${name} has id ${id} and has an inventory of ${inventory}`)
    })
}


db.initialize().then(async () => {
    await loadData()
})
