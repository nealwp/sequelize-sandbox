import * as db from './db'
import * as controller from './controllers'
import { CharacterCreationAttributes } from './@types/character.types'

const newCharacter: CharacterCreationAttributes = {
    name: 'Luke Skywalker',
    age: 27
}

db.initialize().then(async () => {
    await controller.characters.create(newCharacter)
    const result = await controller.characters.getAll()
    console.log(result)
})
