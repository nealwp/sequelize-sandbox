import {
  CharacterAttributes,
  CharacterCreationAttributes,
} from "./models/character.model";
import { Inventory, Mission, MissionTask, Weapon } from "./models";
import { Character } from "./models/character.model";
import { CharacterPayload } from "./@types/payload.types";

const upsert = async (payload: CharacterPayload) => {
  const existingCharacter = await Character.findOne({
    where: { name: payload.character.name },
    include: [
      { model: Inventory, include: [{ model: Weapon }] },
      { model: Mission, include: [{ model: MissionTask }] },
    ],
  });

  if (!existingCharacter) {
    const newCharacter = await Character.create(payload, {
      include: [{ model: Inventory, include: [{ model: Weapon }] }],
    });

    const payloadMissions = payload.missions.map(el => {
      return {
        characterId: newCharacter.id,
        ...el.mission,
        missionTasks: el.missionTasks 
      }
    })

    const characterMissions = await Mission.bulkCreate(payloadMissions, {
      include: [
        {model: MissionTask, as: 'missionTasks'}
      ]
    })

    return {
      status: 201,
      body: {
        character: newCharacter.character,
        inventory: newCharacter.inventory,
        missions: characterMissions.map(el => {return {mission: el.mission, missionTasks: el.missionTasks}})
      },
    };
  }

  const formattedPayload = {
    ...payload.character,
    ...payload
  }

  await Mission.destroy({where: {characterId: existingCharacter.character.id}})

  const payloadMissions = payload.missions.map(el => {
    return {
      characterId: existingCharacter.character.id,
      ...el.mission,
      missionTasks: el.missionTasks 
    }
  })

  const characterMissions = await Mission.bulkCreate(payloadMissions, {
    include: [
      {model: MissionTask, as: 'missionTasks'}
    ]
  })

  const updatedCharacter = await existingCharacter.update(formattedPayload);

  return {
    status: 200,
    body: {
      character: updatedCharacter.character,
      inventory: updatedCharacter.inventory,
      missions: characterMissions.map(el => {return {mission: el.mission, missionTasks: el.missionTasks}})
    },
  };
};

const findById = async (id: number) => {
  const character = await Character.findOne({
    where: { id },
    include: [
      { model: Inventory, include: [{ model: Weapon }] },
      { model: Mission, include: [{ model: MissionTask }] },
    ],
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
      missions: entry.missions.map(el => {return {mission: el.mission, missionTasks: el.missionTasks}})
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
