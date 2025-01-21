import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";
import { boardGame } from "../models/index.js";

class BoardGame {
  static async createBoardGame(req, res, next) {
    try {
      const newBoardGame = req.body;
      
      const createdBoardGame = await boardGame.create(newBoardGame);
      res.status(200).json(createdBoardGame);
    }catch(error) {
      next(error);
    }
  }

  static async deleteBoardGame(req, res, next) {
    try{
      const  boardGameId  = req.params.id;
      
      const deletedGame = await boardGame.findByIdAndDelete(boardGameId);

      if( deletedGame == null ) {
        next( new NotFoundError("Boardgame não encontrado"));
      }
      res.status(200).json({message: "Boardgame apagado com sucesso!"})
    } catch(error) {
      next(error);
    }
  }

  static async listAllBoardGames(req, res, next) {
    try{
      
      const boardGamesList = await boardGame.find({}).populate(["expansions"]).exec();

      res.status(200).json(boardGamesList)
      
    }catch(error) {
      next(error)
    }
  }

  static async searchBoardGameByID(req, res, next) {
    try {
      const id = req.params.id;

      const boardGameFound = await boardGame.findById(id).populate(["expansions"]).exec();

      res.status(200).json(boardGameFound);


    }catch {
      next(error)
    }
  }

  static async searchBoardGameByName(req, res, next) {
    try{

      const boardGameName = req.query.name;
      const boardGameFound = await boardGame.findById(id).populate(["expansions"]).exec();
  
      res.status(200).json(boardGameFound);
    } catch(error) {
      next(error);
    }
    
  }
}

export default BoardGame