import NotFoundError from "../errors/NotFoundError.js";
import { participator } from "../models/index.js";

class participator {
  static async createparticipator(req, res, next) {
    try {
      const newparticipator = req.body;
      
      const createdparticipator = await participator.create(newparticipator);
      res.status(200).json(createdparticipator);
    }catch(error) {
      next(error);
    }
  }

  static async deleteparticipator(req, res, next) {
    try{
      const  participatorId  = req.params.id;
      
      const deletedGame = await participator.findByIdAndDelete(participatorId);

      if( deletedGame == null ) {
        next( new NotFoundError("participator não encontrado"));
      }
      res.status(200).json({message: "participator apagado com sucesso!"})
    } catch(error) {
      next(error);
    }
  }

  static async listAllparticipators(req, res, next) {
    try{
      
      const participatorsList = await participator.find({}).populate(["expansions"]).exec();

      res.status(200).json(participatorsList)
      
    }catch(error) {
      next(error)
    }
  }

  static async searchparticipatorByID(req, res, next) {
    try {
      const id = req.params.id;

      const participatorFound = await participator.findById(id).populate(["expansions"]).exec();

      res.status(200).json(participatorFound);


    }catch {
      next(error)
    }
  }

  static async searchparticipatorByName(req, res, next) {
    try{

      const participatorName = req.query.name;
      const participatorFound = await participator.findById(id).populate(["expansions"]).exec();
  
      res.status(200).json(participatorFound);
    } catch(error) {
      next(error);
    }
    
  }
}

export default participator