import { Optional } from 'sequelize';

interface CharacterAttributes {
    id: number,
    name: string,
    age: number
}

interface CharacterCreationAttributes extends Optional<CharacterAttributes, 'id'> {}

export {CharacterAttributes, CharacterCreationAttributes}