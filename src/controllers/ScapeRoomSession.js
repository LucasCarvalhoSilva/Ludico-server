import { scapeRoomSession, participator } from "../models/index.js";


class ScapeRoomSession {

  static async createScapeRoomSession(req, res, next) {
    try {
      const newScapeRoomSession = req.body;
      const createdScapeRoomSession = await scapeRoomSession.create(newScapeRoomSession);
      res.status(201).json(createdScapeRoomSession);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteScapeRoomSession(req, res, next) {
    const scapeRoomSessionId = req.params.id;

    try {
      const deletedScapeRoomSession = await scapeRoomSession.findByIdAndDelete(scapeRoomSessionId);

      if (!deletedScapeRoomSession) {
        return res.status(404).json({ message: "Sessão de Escape não encontrada" });
      }

      res.status(200).json(deletedScapeRoomSession);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async listScapeRoomSessions(req, res, next) {
    try {
      const scapeRoomSessions = await scapeRoomSession.find().populate('history').exec();
      res.status(200).json(scapeRoomSessions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addParticipatorToScapeRoomSession(req, res, next) {
    try {
      const scapeRoomSessionId = req.params.id;
      const participatorId = req.body.participatorId;

      const scapeRoomSessionFound = await scapeRoomSession.findById(scapeRoomSessionId);
      if (!scapeRoomSessionFound) {
        return res.status(404).json({ message: "Sessão de Escape não encontrada" });
      }
      const participatorFound = await participator.find({ identifier: participatorId });
      if (!participatorFound) {
        return res.status(404).json({ message: "Participante não encontrado" });
      }

      scapeRoomSessionFound.participators.push(participatorFound[0]._id);
      await scapeRoomSessionFound.save();
      res.status(200).json(scapeRoomSessionFound);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async searchScapeRoomSessionByID(req, res, next) {
    try {
      const id = req.params.id;

      const scapeRoomSessionFound = await scapeRoomSession.findById(id).populate('history').exec();

      if (!scapeRoomSessionFound) {
        return res.status(404).json({ message: "Sessão de Escape não encontrada" });
      }

      res.status(200).json(scapeRoomSessionFound);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateScapeRoomSession(req, res, next) {
    const scapeRoomSessionId = req.params.id;
    const updatedData = req.body;

    try {
      const updatedScapeRoomSession = await scapeRoomSession.findByIdAndUpdate(scapeRoomSessionId, updatedData, { new: true });

      if (!updatedScapeRoomSession) {
        return res.status(404).json({ message: "Sessão de Escape não encontrada" });
      }

      res.status(200).json(updatedScapeRoomSession);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default ScapeRoomSession;