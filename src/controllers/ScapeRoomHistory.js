import { scapeRoomHistory } from "../models/index.js";

class ScapeRoomHistory {
  static async createScapeRoomHistory(req, res, next) {
    try {
      const newScapeRoomHistory = req.body;

      const createdScapeRoomHistory = await scapeRoomHistory.create(newScapeRoomHistory);
      res.status(201).json(createdScapeRoomHistory);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }

  static async deleteScapeRoomHistory(req, res, next) {
    const scapeRoomHistoryId = req.params.id;

    try {
      const deletedScapeRoomHistory = await scapeRoomHistory.findByIdAndDelete(scapeRoomHistoryId);

      if (!deletedScapeRoomHistory) {
        return res.status(404).json({ message: "História de Escape não encontrada" });
      }

      res.status(200).json(deletedScapeRoomHistory);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }

  static async listScapeRoomHistory(req, res, next) {
    try {
      const scapeRoomHistories = await scapeRoomHistory.find().exec();
      res.status(200).json(scapeRoomHistories);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }
  static async searchScapeRoomHistoryByID(req, res, next) {
    try {
      const id = req.params.id;

      const scapeRoomHistoryFound = await scapeRoomHistory.findById(id).exec();

      if (!scapeRoomHistoryFound) {
        return res.status(404).json({ message: "História de Escape não encontrada" });
      }

      res.status(200).json(scapeRoomHistoryFound);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }

  static async updateScapeRoomHistory(req, res, next) {
    const scapeRoomHistoryId = req.params.id;
    const updatedData = req.body;

    try {
      const updatedScapeRoomHistory = await scapeRoomHistory.findByIdAndUpdate(scapeRoomHistoryId, updatedData, { new: true });

      if (!updatedScapeRoomHistory) {
        return res.status(404).json({ message: "História de Escape não encontrada" });
      }

      res.status(200).json(updatedScapeRoomHistory);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }
}

export default ScapeRoomHistory