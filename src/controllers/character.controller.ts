import { CharacterController, CharacterCreationAttributes } from "../@types/character.types";
import { Inventory, Weapon } from "../models";
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
    return await Character.findAll({include: Inventory})
}


const characters: CharacterController = {
    create,
    update,
    findById,
    findAll
}

export { characters }