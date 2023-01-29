import { CharacterCreationAttributes } from "../@types/character.types";
import { Controller } from "../@types/controller.types";
import { Inventory } from "../models";
import { Character } from "../models/character.model";

const create = async(character: CharacterCreationAttributes) => {
    return await Character.create(character)
}

const update = async (character: Character) => {
    const existingCharacter = await Character.findOne({where: {id: character.id}})
    
    if(!existingCharacter){
        throw new Error(`Character id ${character.id} not found!`)
    }

    return await existingCharacter.update(character)
}
const get = async (id: number) => {
    const character = await Character.findOne({
        where: { id },
        include: Inventory
    })

    if(!character){
        throw new Error(`Character id ${id} not found!`)
    }

    return character
}

const getAll = async () => {
    return await Character.findAll({include: Inventory})
}

const weapons: Controller<Character, CharacterCreationAttributes> = {
    create,
    update,
    get,
    getAll
}

export default weapons