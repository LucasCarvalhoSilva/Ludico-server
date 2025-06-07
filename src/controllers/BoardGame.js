import NotFoundError from "../errors/NotFoundError.js";
import { boardGame } from "../models/index.js";

class BoardGame {
  static async createBoardGame(req, res, next) {
    try {
      const newBoardGame = req.body;
      
      newBoardGame.playedTime = 0
      const createdBoardGame = await boardGame.create(newBoardGame);
      res.status(201).json(createdBoardGame);
    }catch(error) {
      res.status(500).json(error);
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
      res.status(500).json(error);
    }
  }

  static async listAllBoardGames(req, res, next) {
    try{
      
      const boardGamesList = await boardGame.find({}).populate(["expansions"]).exec();

      res.status(200).json(boardGamesList)
      
    }catch(error) {
      res.status(500).json(error);
    }
  }

  static async searchBoardGameByID(req, res, next) {
    try {
      const id = req.params.id;

      const boardGameFound = await boardGame.findById(id).populate(["expansions"]).exec();

      res.status(200).json(boardGameFound);


    }catch(error) {
      res.status(500).json(error);
    }
  }

  static async searchBoardGameByFilters(req, res, next) {
    try{
      const filters = req.query

      console.log("filters", filters)
      
      let boardGameFound;

      if( filters.name == null && filters.qrCode == null ) {
        res.status(404).json("error: name or qrCode is required");
        return;
      }
      if( filters.name != null ) {
        boardGameFound = await boardGame.findOne({boardGameName: filters.name}).populate(["expansions"]).exec();
      }
      if( filters.qrCode != null ) {
        boardGameFound = await boardGame.findOne({qrCode: filters.qrCode}).populate(["expansions"]).exec();
      }

      if(boardGameFound == null) {
        res.status(404).json("error: boardgame not found");
        return;
      }
  
      res.status(200).json(boardGameFound);
    } catch(error) {
      res.status(500).json(error);
    }
  }

}

export default BoardGame