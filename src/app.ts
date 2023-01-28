import * as db from './db'
import characters from './controllers/character.controller'
import { CharacterCreationAttributes } from './@types/character.types'

const newCharacter: CharacterCreationAttributes = {
    name: 'Luke Skywalker',
    age: 27
}

db.initialize().then(async () => {
    await characters.create(newCharacter)
    const result = await characters.getAll()
    console.log(result)
})
