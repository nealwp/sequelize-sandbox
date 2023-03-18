import { CharacterCreationAttributes } from "../../src/models/character.model";
import { characters } from "../../src/controller";
import { Character } from "../../src/models";

describe("character controller", () => {
 
  describe("upsert", () => {
    
    test("should return the created character and 201 if new character", async () => {
        const newCharacter: CharacterCreationAttributes = {
          name: "name",
          age: 21,
        };

        const expectedResult = {
            character: {id: 0, ...newCharacter},
            inventory: []
          }
  
        Character.findOne = jest.fn().mockResolvedValue(null);
        Character.create = jest.fn().mockResolvedValue({ 
            character: {id: 0, ...newCharacter},
            inventory: [] 
        });
  
        const result = await characters.upsert(newCharacter);
        
        expect(result.body).toEqual(expectedResult);
        expect(result.status).toEqual(201)
      });

    test("should return updated character and 200 if character updated", async () => {
      const updatedCharacter = <Character>{ id: 0, name: "name", age: 22 };

      const expectedResult = {
        character: updatedCharacter,
        inventory: []
      }

      Character.findOne = jest.fn().mockResolvedValue({
        update: () => {
            return {
                character: updatedCharacter,
                inventory: []
            }
        },
      });

      const result = await characters.upsert(updatedCharacter);

      expect(result.body).toEqual(expectedResult);
      expect(result.status).toEqual(200);
    });
  });

  describe("findById", () => {
    test("should throw an error if character does not exist", async () => {
      const characterId = 9999;

      Character.findOne = jest.fn().mockResolvedValue(null);

      await expect(
        async () => await characters.findById(characterId)
      ).rejects.toThrow(`Character id ${characterId} not found!`);
    });

    test("should return a character if found", async () => {
      const characterId = 0;

      Character.findOne = jest.fn().mockResolvedValue({ id: characterId });

      const result = await characters.findById(characterId);

      expect(result).toEqual({ id: characterId });
    });
  });

  describe("findAll", () => {
    test("should return an array of characters", async () => {
      Character.findAll = jest
        .fn()
        .mockResolvedValue(["found some characters"]);

      const result = await characters.findAll();

      expect(result.length).toBeGreaterThan(0);
    });
  });
});
