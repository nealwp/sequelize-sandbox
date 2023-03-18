import { CharacterAttributes, CharacterCreationAttributes } from "../models/character.model";
import { Inventory, Weapon } from "../models";
import { Character } from "../models/character.model";
import { Controller } from "../@types/controller.types";

interface CharacterController extends Controller<Character, CharacterAttributes, CharacterCreationAttributes> {}

const create = async(character: CharacterCreationAttributes) => {
    return await Character.create(character)
}

const update = async (character: CharacterAttributes) => {
    const existingCharacter = await Character.findOne({where: {id: character.id}})
    
    if(!existingCharacter){
        throw new Error(`Character id ${character.id} not found!`)
    }

    return await existingCharacter.update(character)
}

const findById = async (id: number) => {
    const character = await Character.findOne({
        where: { id },
        include: [{
                model: Inventory,
                include: [ Weapon ]
            }]
    })

    if(!character){
        throw new Error(`Character id ${id} not found!`)
    }

    return character
}

const findAll = async () => {
    const allCharacters = await Character.findAll({
        include: {
            model: Inventory,
            include: [ Weapon ]
        }
    })

    return allCharacters
}

const characters: CharacterController = {
    create,
    update,
    findById,
    findAll
}

export { characters }