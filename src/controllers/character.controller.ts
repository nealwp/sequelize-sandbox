import { CharacterCreationAttributes } from "../@types/character.types";
import { Character } from "../models/character.model";


const create = async(character: CharacterCreationAttributes) => {
    return await Character.create(character)
}

const getAll = async () => {
    return await Character.findAll()
}
 
export default {
    create,
    getAll
}