import { oneShot, participator } from "../models/index.js";

class OneShot {
  static async createOneShot(req, res, next) {
      try {
          const newOneShot = req.body;
          const createdOneShot = await oneShot.create(newOneShot);
          res.status(201).json(createdOneShot);
      } catch (error) {
          res.status(500).json(error);
      }
  }
  
  static async deleteOneShot(req, res, next) {
      const oneShotId = req.params.id;

      try {
          const deletedOneShot = await oneShot.findByIdAndDelete(oneShotId);

          if (!deletedOneShot) {
              return res.status(404).json({ message: "One Shot not found" });
          }

          res.status(200).json(deletedOneShot);
      } catch (error) {
          res.status(500).json(error);
      }
  }

  static async listOneShot(req, res, next) {
      try {
          const oneShots = await oneShot.find()
          .populate('master')
          .populate('system')
          .populate(["players"])
          .populate(["characters"])
          .exec();
          res.status(200).json(oneShots);
      } catch (error) {
          res.status(500).json(error);
      }
  }

  static async addParticipatorToOneShot(req, res, next) {
      try {
          const oneShotId = req.params.id;
          const participatorId = req.body.participatorId;

          const oneShotFound = await oneShot.findById(oneShotId);
          console.log("One Shot found:", oneShotFound);
          if (!oneShotFound) {
              return res.status(404).json({ message: "One Shot not found" });
          }

          const participatorFound = await participator.find({ identifier: participatorId });
          console.log("Participator found:", participatorFound);
          if (!participatorFound) {
            console.log("Participator not found");  
            return res.status(404).json({ message: "Participator not found" });
          }
          oneShotFound.players.push(participatorFound[0]._id);
          await oneShotFound.save();

          res.status(200).json(oneShotFound);
      } catch (error) {
          res.status(500).json(error);
      }
  }

  static async searchOneShotByID(req, res, next) {
      try {
          const id = req.params.id;

          const oneShotFound = await oneShot
              .findById(id)
              .populate('master')
              .populate('system')
              .populate(["players"])
              .populate(["characters"])
              .exec();

          res.status(200).json(oneShotFound);
      } catch (error) {
          res.status(500).json(error);
      }
  }

  static async updateOneShot(req, res, next) {
      try {
          const oneShotId = req.params.id;
          const updatedOneShot = req.body;

          const updatedOneShotData = await oneShot.findByIdAndUpdate(
              oneShotId,
              updatedOneShot,
              { new: true }
          );

          if (!updatedOneShotData) {
              return res.status(404).json({ message: "One Shot not found" });
          }

          res.status(200).json(updatedOneShotData);
      } catch (error) {
          res.status(500).json(error);
      }
  }
}


export default OneShot;