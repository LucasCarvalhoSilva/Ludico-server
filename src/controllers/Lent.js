import { lent } from "../models/index.js";
import gameAvailable from "../utils/gameAvailable.js";
import changeGameDisponible from "../utils/changeGameDisponible.js";
import playedTime from "../utils/playedTime.js";

class Lent {
  static async createLent(req, res, next) {
    try {
      const newLent = req.body;
      
      newLent.lentTime = new Date();
      newLent.status = "lent"

      if (gameAvailable(newLent.boardgameLent)) {
        const createdLent = await lent.create(newLent);
        changeGameDisponible(newLent.boardgameLent);
        res.status(200).json(createdLent);
      } else {
        res.status(500).json("Jogo indisponivel");
      }

    }catch(error) {
      next(error);
    }
  }

  static async listAllLents(req, res, next) {
    try{
      
      const lentsList = await lent.find({}).populate("boardgameLent").populate("participator").exec();

      res.status(200).json(lentsList)
      
    }catch(error) {
      next(error)
    }
  }

  static async updateLent(req, res, next) {
    try{
      
      const lentFounded = await lent.findById({}).populate("boardgameLent").populate("participator").exec();
      lentFounded.status = "returned"
      lentFounded.returnTime = new Date()

      const sessionPlayedtime = playedTime(lentFounded.lentTime, lentFounded.returnTime )
      

      res.status(200).json(lentsList)
      
    }catch(error) {
      next(error)
    }
  }
}

export default Lent