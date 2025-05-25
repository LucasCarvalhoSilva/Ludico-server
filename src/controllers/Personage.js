import { personage } from "../models/index.js";

class Personage {
  static async createPersonage(req, res, next) {
    try {
      const newPersonage = req.body;

      const createdPersonage = await personage.create(newPersonage);
      res.status(200).json(createdPersonage);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async listAllPersonages(req, res, next) {
    try {
      const personagesList = await personage
        .find({})
        .populate(["oneShot"])
        .populate(["rpgSystem"])
        .populate("campaing")
        .exec();

      res.status(200).json(personagesList);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deletePersonage(req, res, next) {
    try {
      const personageId = req.params.id;

      const deletedPersonage = await personage.findByIdAndDelete(personageId);

      if (deletedPersonage == null) {
        next(new NotFoundError("Personagem não encontrado"));
      }
      res.status(200).json({ message: "Personagem apagado com sucesso!" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default Personage;