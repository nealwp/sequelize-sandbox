import * as db from './db'
import { characters, weapons, inventory } from './controllers'
import { CharacterCreationAttributes } from './@types/character.types'
import { MELEE, WeaponCreationAttributes } from './@types/weapon.types'
import server from './server'

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
    const luke = await characters.create(newCharacter)
    const lightsaber = await weapons.create(newWeapon)
    const lukeInventory = await inventory.create({characterId: luke.id})
    lightsaber.inventoryId = lukeInventory.id
    await weapons.update(lightsaber)

    const results = await characters.findAll()
    results.forEach(result => {
        const name = result.name
        const id = result.id
        const inventory = JSON.stringify(result.inventory)

        console.log(`${name} has id ${id} and has an inventory of ${inventory}`)
    })
}

const PORT = 3000

db.initialize().then(async () => {
    server.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`)
    })
})
