import NotFoundError from "../errors/NotFoundError.js";
import { ceremony, scapeRoomSession } from "../models/index.js";
import { lent } from "../models/index.js";
import { boardGame, oneShot } from "../models/index.js";
import { participator } from "../models/index.js";
import gameAvailable from "../utils/gameAvailable.js";


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
      res.status(500).json(error);
    }
  }

  static async searchCeremonyByID(req, res, next) {
    try {
      const id = req.params.id;

      const ceremonyList = await ceremony
        .findById(id)
        .populate(["participators"])
        .populate({ path: "oneShotAvailables", populate: [{ path: "master" }, { path: "system" }, { path: "players" }, { path: "characters" }] })
        .populate(["boardGamesAvailables"])
        .populate({path: "scapeRoomSessions", populate: [{ path: "participators" }, { path: "history" }] })
        .exec();

      res.status(200).json(ceremonyList)


    } catch (error) {
      res.status(500).json(error);
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
        const boardGameFound = await boardGame.find({
          $or:
          [
            { qrCode: boardGameId },
            { boardGameName: boardGameId }
          ]
        }).exec();
        console.log("boardGameFound", boardGameFound)
        if (boardGameFound.length === 0) { 
          return res.status(500).json("Jogo não cadastrado no sistema");
        }

        ceremonyFounded.boardGamesAvailables.push(boardGameFound[0]._id);
        await ceremonyFounded.save();
        res.status(200).json(ceremonyFounded);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async removeBoardGameFromCeremony(req, res, next) {
    try {

      const ceremonyId = req.params.id;
      const boardGameId = req.body.boardgameId; 
      
      const ceremonyFounded = await ceremony.findById(ceremonyId).exec();
      console.log("ceremonyId", ceremonyId)
      console.log("boardGameId", boardGameId)
      console.log("ceremonyFounded", ceremonyFounded)
      if (ceremonyFounded) {
        const index = ceremonyFounded.boardGamesAvailables.indexOf(boardGameId);
        if (index > -1) {
          ceremonyFounded.boardGamesAvailables.splice(index, 1);
        }
      
      }
      await ceremonyFounded.save();
      res.status(200).json(ceremonyFounded);
    }catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }


  static async addParticipatorToCeremony(req, res, next) {
    try {
      const ceremonyId = req.params.id;
      const participatorId = req.body.participatorId;

      const ceremonyFounded = await ceremony.findById(ceremonyId).exec();
      const participatorFounded = await participator.find({ identifier: participatorId }).exec();
      console.log("Participator => ", participatorFounded)
      if (participatorFounded.length === 0) {
        return res.status(500).json("Participador não cadastrado no sistema");
      }
      if (ceremonyFounded === null) { 
        return res.status(500).json("Evento não cadastrado no sistema");
      }
      ceremonyFounded.participators.push(participatorFounded[0]._id);
      await ceremonyFounded.save();
      res.status(200).json(ceremonyFounded);
        
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

  static async addScapeRoomSessionToCeremony(req, res, next) {
    try {
      const ceremonyId = req.params.id;
      const newScapeRoomSession = req.body;

      const scapeRoomSessionCreated = await scapeRoomSession.create(newScapeRoomSession);
      const scapeRoomSessionCreatedID = scapeRoomSessionCreated._id;

      const ceremonyFounded = await ceremony.findById(ceremonyId).exec();
      if (ceremonyFounded) {
        ceremonyFounded.scapeRoomSessions.push(scapeRoomSessionCreatedID);
        await ceremonyFounded.save();
        res.status(200).json(ceremonyFounded);
      }else {
        res.status(404).json({ message: "Cerimônia não encontrada" });
      }

    } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
    }
  }

  static async lent(req, res, next) {
    try {
      const ceremonyId = req.params.id;
      const newLent = req.body;

      newLent.lentTime = new Date();
      newLent.status = "lent";

      const ceremonyList = await ceremony
        .findById(ceremonyId)
        .populate(["participators"])
        .populate(["oneShotAvailables"])
        .populate(["boardGamesAvailables"])
        .populate(["scapeRoomSessions"])
        .exec();


      const participatorExists = await participator.find({ identifier: newLent.participator });

      if (participatorExists.length === 0) {
        return res.status(404).json({ message: "Participador não existe no sistema" });
      }

      const boardGameExists = await boardGame.find({
        $or:
          [
            { qrCode: newLent.boardgameLent },
            { boardGameName: newLent.boardgameLent }
          ]
      });

      if (boardGameExists.length === 0) {
        return res.status(404).json({ message: "Jogo não existe no sistema" });
      }

      const participatorFound = ceremonyList.participators.filter(
        (participator) => participator.identifier === newLent.participator
      );



      if (participatorFound.length === 0) {
        return res.status(404).json({ message: "Participador não encontrado" });
      }

      newLent.participator = participatorFound[0]._id;
      console.log(newLent)


      const boardGameFoundInTheCeremony = ceremonyList.boardGamesAvailables.filter(
        (boardGame) => boardGame.qrCode === newLent.boardgameLent || boardGame.boardGameName === newLent.boardgameLent
      );

      console.log("boardGameFoundInTheCeremony => ", boardGameFoundInTheCeremony)
      if (boardGameFoundInTheCeremony.length === 0) {
        console.log("boardGameFoundInTheCeremony", boardGameFoundInTheCeremony)
        return res.status(404).json({ message: "Jogo não encontrado" });
      }

      newLent.boardgameLent = boardGameFoundInTheCeremony[0]._id;
      console.log(newLent)

      const isBoardgameAvailable = await gameAvailable(newLent.boardgameLent);

      console.log("isBoardgameAvailable", isBoardgameAvailable)


      console.log("Emprestimo: ", newLent)
      if (isBoardgameAvailable) {
        const createdLent = await lent.create(newLent);
        const boardGameFound = await boardGame.findById(newLent.boardgameLent);
        boardGameFound.isAvailable = !boardGameFound.isAvailable;
        await boardGameFound.save();
        res.status(200).json(createdLent);
      } else {
        res.status(500).json("Jogo indisponivel");
      }

    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  static async addOneShotToCeremony(req, res, next) {
    try {
      const ceremonyId = req.params.id;
      const newOneShot = req.body;

      const oneShotCreated = await oneShot.create(newOneShot);
      const oneShotId = oneShotCreated._id;

      const ceremonyFounded = await ceremony.findById(ceremonyId).exec();
      if (ceremonyFounded) {
        ceremonyFounded.oneShotAvailables.push(oneShotId);
        await ceremonyFounded.save();
        res.status(200).json(ceremonyFounded);
      }else {
        res.status(404).json({ message: "Cerimônia não encontrada" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
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