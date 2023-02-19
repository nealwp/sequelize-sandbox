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
        test('should throw an error if character does not exist', async () => {
            const character = <Character>{id: 9999}

            Character.findOne = jest.fn().mockResolvedValue(null)

            await expect(
                async () => await characters.update(character)
            ).rejects.toThrow(`Character id ${character.id} not found!`)
        })

        test('should return updated character if update is successful', async () => {
            const updatedCharacter = <Character>{id: 0, name: 'name', age: 22}

            Character.findOne = jest.fn().mockResolvedValue({update: () => updatedCharacter})
            
            const result = await characters.update(updatedCharacter)
            expect(result).toEqual(updatedCharacter)
        })
    })

    describe('findById', () => {

    })

    describe('findAll', () => {

    })
})