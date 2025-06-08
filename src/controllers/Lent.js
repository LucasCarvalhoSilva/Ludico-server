import { lent } from "../models/index.js";
import { boardGame } from "../models/index.js";
import { participator } from "../models/index.js";
import gameAvailable from "../utils/gameAvailable.js";
import playedTime from "../utils/playedTime.js";

class Lent {
  static async createLent(req, res, next) {
    try {
      const newLent = req.body;
      const participatorIdentifier = req.body.participator;

      newLent.lentTime = new Date();
      newLent.status = "lent";

      const isBoardgameAvailable = await gameAvailable(newLent.boardgameLent);
      console.log("Jogo está disponivel: ", isBoardgameAvailable);
      


      if (isBoardgameAvailable) {
        const participatorFound = await participator.findOne({ identifier: participatorIdentifier });
        if (!participatorFound) {
          return res.status(404).json({ message: "Participante não encontrado" });
        }
        newLent.participator = participatorFound._id;

        const createdLent = await lent.create(newLent);
        const boardGameFound = await boardGame.findById(newLent.boardgameLent);
        boardGameFound.isAvailable = !boardGameFound.isAvailable;
        await boardGameFound.save();
        res.status(200).json(createdLent);
      } else {
        res.status(500).json("Jogo indisponivel");
      }

    }catch(error) {
      res.status(500).json(error);
    }
  }

  static async listAllLents(req, res, next) {
    try{
      
      const lentsList = await lent.find({}).populate("boardgameLent").populate("participator").exec();

      res.status(200).json(lentsList);
      
    }catch(error) {
      res.status(500).json(error);
    }
  }

  static async listUnreturnedLents (req, res, next) {
    try{
      const unreturnedLentsList = await lent.find({ status: "lent" }).populate("boardgameLent").populate("participator").exec();
      res.status(200).json(unreturnedLentsList);
    }catch(error) {
      res.status(500).json(error);
    }

  }

  static async updateLent(req, res, next) {
    try{
      
      const  lentId  = req.params.id;
      console.log(lentId)
      const playedTimes = req.body.playedTimes
      const lentFounded = await lent.findById(lentId).populate("boardgameLent").populate("participator").exec();
      if(lentFounded) {
        
        lentFounded.status = "returned"
        lentFounded.returnTime = new Date()
  
        const sessionPlayedtime = playedTime(lentFounded.lentTime, lentFounded.returnTime)

        //console.log(lentFounded)
        const boardGameFound = await boardGame.findById(lentFounded.boardgameLent._id);
        if(boardGameFound){
          console.log(boardGameFound.isAvailable)
          boardGameFound.isAvailable = !boardGameFound.isAvailable;
          console.log(boardGameFound.isAvailable)
          
          boardGameFound.quantityOfTimesBorrowed = boardGameFound.quantityOfTimesBorrowed++;
          boardGameFound.quantityOfTimesPlayed = boardGameFound.quantityOfTimesPlayed + playedTimes;
          boardGameFound.playedTime = boardGameFound.playedTime + sessionPlayedtime;
          
          await boardGameFound.save();
        }
        await lentFounded.save();
        res.status(200).json(lentFounded);
      }
      
    }catch(error) {
      res.status(500).json(error);
    }
  }
}

export default Lent;