import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";
import { ceremony } from "../models/index.js";

class Ceremony {
  static async createCeremony(req, res, next) {
    try {
      const newCeremony = req.body;
      console.log("Está chegando aqui", newCeremony)

      const createdCeremony = await ceremony.create(newCeremony);
      res.status(200).json(createdCeremony);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async listAllCeremonies(req, res, next) {
    try {

      const ceremonyList = await ceremony
        .find({})
        .populate(["participators"])
        .populate(["oneShotAvailables"])
        .populate(["boardGamesAvailables"])
        .populate(["scapeRoomSessions"])
        .exec();

      res.status(200).json(ceremonyList)

    } catch (error) {
      next(error)
    }
  }

  static async searchCeremonyByID(req, res, next) {
    try {
      const id = req.params.id;

      const ceremonyList = await ceremony
        .findById()
        .populate(["participators"])
        .populate(["oneShotAvailables"])
        .populate(["boardGamesAvailables"])
        .populate(["scapeRoomSessions"])
        .exec();

      res.status(200).json(ceremonyList)


    } catch {
      next(error)
    }
  }

  static async updateCeremony(req, res, next) {
    try {
      const ceremonyId = req.params.id;
      const ceremonyFounded = await ceremony.findById(ceremonyId).exec();
      if (ceremonyFounded) {
        ceremonyFounded.eventName = req.body.eventName;
        ceremonyFounded.eventDate = req.body.eventDate;
        ceremonyFounded.eventCity = req.body.eventCity;
        ceremonyFounded.eventPlace = req.body.eventPlace;
        ceremonyFounded.eventStartTime = req.body.eventStartTime;
        ceremonyFounded.eventEndTime = req.body.eventEndTime;

        await ceremonyFounded.save();
        res.status(200).json(ceremonyFounded);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async addBoardGameToCeremony(req, res, next) {
    try {
      const ceremonyId = req.params.id;
      const boardGameId = req.body.boardGameId;

      const ceremonyFounded = await ceremony.findById(ceremonyId).exec();
      if (ceremonyFounded) {
        ceremonyFounded.boardGamesAvailables.push(boardGameId);
        await ceremonyFounded.save();
        res.status(200).json(ceremonyFounded);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  
  static async addParticipatorToCeremony(req, res, next) {
    try {
      const ceremonyId = req.params.id;
      const participatorId = req.body.participatorId;
      
      const ceremonyFounded = await ceremony.findById(ceremonyId).exec();
      if (ceremonyFounded) {
        ceremonyFounded.participators.push(participatorId);
        await ceremonyFounded.save();
        res.status(200).json(ceremonyFounded);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async searchBoardGameInCeremonyByQRCode(req, res, next) {
    try {
      const ceremonyId = req.params.id;
      const boardGameQRCode = req.body.qrCode;

      const ceremonyList = await ceremony
        .findById(ceremonyId)
        .populate(["participators"])
        .populate(["oneShotAvailables"])
        .populate(["boardGamesAvailables"])
        .populate(["scapeRoomSessions"])
        .exec();

      const boardGameFound = ceremonyList.boardGamesAvailables.filter(
        (boardGame) => boardGame.qrCode === boardGameQRCode
      );

      res.status(200).json(boardGameFound)

    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async searchParticipatorInCeremonyByIdentifier(req, res, next) {
    try {
      const ceremonyId = req.params.id;
      const participatorIdentifier = req.body.identifier;

      const ceremonyList = await ceremony
        .findById(ceremonyId)
        .populate(["participators"])
        .populate(["oneShotAvailables"])
        .populate(["boardGamesAvailables"])
        .populate(["scapeRoomSessions"])
        .exec();

      const participatorFound = ceremonyList.participators.filter(
        (participator) => participator.identifier === participatorIdentifier
      );

      res.status(200).json(participatorFound)

    } catch (error) {
      res.status(500).json(error);
    }
  }


  static async deleteCeremony(req, res, next) {
    try {
      const ceremonyId = req.params.id;
  
      const deletedCeremony = await ceremony.findByIdAndDelete(ceremonyId);
  
      if (deletedCeremony == null) {
        next(new NotFoundError("Evento não encontrado"));
      }
      res.status(200).json({ message: "Evento apagado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
}


export default Ceremony