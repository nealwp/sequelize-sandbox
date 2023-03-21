import { Character } from "./character.types"
import { MissionTask } from "./mission-task.types"
import { Mission } from "./mission.types"
import { Weapon } from "./weapon.types"

export type MissionObject = {
    mission: Mission,
    missionTasks: MissionTask[]
}

type InventoryObject = {
    weapons: Weapon[]
}

export type CharacterPayload = {
    character: Character,
    missions: MissionObject[],
    inventory: InventoryObject[]
}