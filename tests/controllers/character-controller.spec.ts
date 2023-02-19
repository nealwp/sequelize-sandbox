import { CharacterCreationAttributes } from "../../src/@types/character.types"
import { characters } from "../../src/controllers"
import { Character } from "../../src/models"

describe('character controller', () => {
    describe('create', () => {
        test('should return the created character', async () => {
            const newCharacter: CharacterCreationAttributes = {
                name: 'name',
                age: 21
            }

            Character.create = jest.fn().mockResolvedValue({id: 0, ...newCharacter})

            const result = await characters.create(newCharacter)
            expect(result).toEqual({id: 0, ...newCharacter})
        })
    })

    describe('update', () => {

    })

    describe('findById', () => {

    })

    describe('findAll', () => {

    })
})