import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";
import { ceremony } from "../models/index.js";

class Ceremony {
  static async createCeremony(req, res, next) {
    try {
      console.log("Está chegando aqui")
      const newCeremony = req.body;
      
      const createdCeremony = await ceremony.create(newCeremony);
      res.status(200).json(createdCeremony);
    }catch(error) {
      res.status(500).json(error);
    }
  }

  static async listAllCeremonies(req, res, next) {
    try{
      
      const boardGamesList = await ceremony
        .find({})
        .populate(["participators"])
        .populate(["oneShotAvailables"])
        .populate(["boardGamesAvailables"])
        .populate(["scapeRoomSessions"])
        .exec();

      res.status(200).json(boardGamesList)
      
    }catch(error) {
      next(error)
    }
  }

  static async searchCeremonyByID(req, res, next) {
    try {
      const id = req.params.id;

      const boardGameFound = await ceremony
      .findById(id)
      .populate(["participators"])
      .populate(["oneShotAvailables"])
      .populate(["boardGamesAvailables"])
      .populate(["scapeRoomSessions"])
      .exec();

      res.status(200).json(boardGameFound);


    }catch {
      next(error)
    }
  }
}

export default Ceremony