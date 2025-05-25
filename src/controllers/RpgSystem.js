import { rpgSystem } from "../models/index.js";

class RpgSystem {
  static async createRpgSystem(req, res, next) {
    
    const newRpgSystem = req.body;
    try {

      console.log(newRpgSystem);
      const createdRpgSystem = await rpgSystem.create(newRpgSystem);
      
      res.status(201).json(createdRpgSystem);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteCreateRpgSystem(req, res, next) {
    const rpgSystemId = req.params.id;

    try {
      const deletedRpgSystem = await rpgSystem.findByIdAndDelete(rpgSystemId);

      if (!deletedRpgSystem) {
        return res.status(404).json({ message: "RPG System not found" });
      }

      res.status(200).json(deletedRpgSystem);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getRpgSystem(req, res, next) {
    try {
      const rpgSystems = await rpgSystem.find();
      res.status(200).json(rpgSystems);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateRpgSystem(req, res, next) {
  
    const rpgSystemId = req.params.id;
    const updatedRpgSystem = req.body;

    try {
      const updatedRpgSystemData = await rpgSystem.findByIdAndUpdate(
        rpgSystemId,
        updatedRpgSystem,
        { new: true }
      );

      if (!updatedRpgSystemData) {
        return res.status(404).json({ message: "RPG System not found" });
      }

      res.status(200).json(updatedRpgSystemData);
    } catch (error) {
      res.status(500).json(error);
    }
  }


}

export default RpgSystem;