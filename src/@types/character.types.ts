import { Optional } from 'sequelize';
import { Character } from '../models';
import { Controller } from './controller.types';

interface CharacterAttributes {
    id: number,
    name: string,
    age: number
}

interface CharacterCreationAttributes extends Optional<CharacterAttributes, 'id'> {}

interface CharacterController extends Controller<Character, CharacterCreationAttributes> {}

export {CharacterAttributes, CharacterCreationAttributes, CharacterController }