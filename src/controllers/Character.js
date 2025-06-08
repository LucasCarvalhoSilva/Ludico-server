import { character } from "../models/index.js";
import { campaing } from "../models/index.js";

class Character {
  static async createCharacter(req, res, next) {
    try {
      const newCharacter = req.body;

      const campaingId = req.body.campaing;
      const createdCharacter = await character.create(newCharacter);
      if(createdCharacter) {
        const campaingFound = await campaing.findById(campaingId);
        if (!campaingFound) {
          return res.status(404).json({ message: "Campanha não encontrada" });
        }

        campaingFound.characters.push(createdCharacter._id);
        await campaingFound.save();
      }

      res.status(200).json(createdCharacter);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async listAllCharacters(req, res, next) {
    try {
      const characterList = await character
        .find({})
        .populate("player")
        .populate("campaing")
        .populate(["system"])
        .exec();

      res.status(200).json(characterList);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateCharacter(req, res, next) {
    try {
      const characterId = req.params.id;
      const updatedCharacter = req.body;

      const updatedCharacterData = await character.findByIdAndUpdate(
        characterId,
        updatedCharacter,
        { new: true }
      );

      if (!updatedCharacterData) {
        return res.status(404).json({ message: "Personagem não encontrado" });
      }

      res.status(200).json(updatedCharacterData);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteCharacter(req, res, next) {
    try {
      const characterId = req.params.id;

      const deletedCharacter = await character.findByIdAndDelete(characterId);

      if (deletedCharacter == null) {
        res.status(500).json({ message: "Erro ao deletar o personagem" });;
      }
      res.status(200).json({ message: "Personagem apagado com sucesso!" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default Character;