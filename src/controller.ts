import {
  CharacterAttributes,
  CharacterCreationAttributes,
} from "./models/character.model";
import { Inventory, Mission, MissionTask, Weapon } from "./models";
import { Character } from "./models/character.model";

const upsert = async (character: CharacterCreationAttributes) => {
  const existingCharacter = await Character.findOne({
    where: { name: character.name },
    include: [{ model: Inventory, include: [{ model: Weapon }] }],
  });

  if (!existingCharacter) {
    const newCharacter = await Character.create(character, {
      include: [{ model: Inventory, include: [{ model: Weapon }] }],
    });

    return {
      status: 201,
      body: {
        character: newCharacter.character,
        inventory: newCharacter.inventory,
      },
    };
  }

  const updatedCharacter = await existingCharacter.update(character);

  return {
    status: 200,
    body: {
      character: updatedCharacter.character,
      inventory: updatedCharacter.inventory,
    },
  };
};

const findById = async (id: number) => {
  const character = await Character.findOne({
    where: { id },
    include: [{ model: Inventory, include: [{ model: Weapon }] }],
  });

  if (!character) {
    throw new Error(`Character id ${id} not found!`);
  }

  return character;
};

const findAll = async () => {
  const allCharacters = await Character.findAll({
    include: [
      { model: Inventory, include: [{ model: Weapon }] },
      { model: Mission, include: [{ model: MissionTask }] },
    ],
  });

  const formattedResponse = allCharacters.map((entry) => {
    return {
      character: entry.character,
      inventory: entry.inventory,
      missions: entry.missions
    };
  });

  return formattedResponse;
};

const characters = {
  findById,
  findAll,
  upsert,
};

export { characters };
