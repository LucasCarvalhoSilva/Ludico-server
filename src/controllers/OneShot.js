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
          .populate(["participators"])
          .populate(["players"])
          .populate(["personages"])
          .exec();
          res.status(200).json(oneShots);
      } catch (error) {
          res.status(500).json(error);
      }
  }
}


export default OneShot;