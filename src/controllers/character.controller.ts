import { CharacterCreationAttributes } from "../@types/character.types";
import { Character } from "../models/character.model";


const createCharacter = async(character: CharacterCreationAttributes) => {
    return await Character.create(character)
}

export default {
    createCharacter
}