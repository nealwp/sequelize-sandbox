import { Character } from "./character.types"
import { Follower } from "./follower.types"
import { Inventory } from "./inventory.types"

export type CharacterPayload = {
    character: Character,
    inventory: Inventory[],
    followers: Follower[]
}