import { campaing } from "../models/index.js";

class Campaing {

  static async createCampaing(req, res, next) {
    try {
      const newCampaing = req.body;
      const createdCampaing = await campaing.create(newCampaing);
      res.status(201).json(createdCampaing);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  static async listAllCampaings(req, res, next) {
    try {
      const campaings = await campaing
        .find()
        .populate('master')
        .populate('system')
        .populate('characters')
        .exec();
      res.status(200).json(campaings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async searchCampaingByID(req, res, next) {
    const campaingId = req.params.id;

    try {
      const foundCampaing = await campaing
        .findById(campaingId)
        .populate('master')
        .populate('system')
        .populate('characters')
        .exec();
      if (!foundCampaing) {
        return res.status(404).json({ message: "Campanha não encontrada" });
      }
      res.status(200).json(foundCampaing);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateCampaing(req, res, next) {
    const campaingId = req.params.id;
    const updatedData = req.body;

    try {
      const updatedCampaing = await campaing.findByIdAndUpdate(campaingId, updatedData, { new: true }).populate('history').exec();
      if (!updatedCampaing) {
        return res.status(404).json({ message: "Campanha não encontrada" });
      }

      updatedCampaing.save();
      res.status(200).json(updatedCampaing);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteCampaing(req, res, next) {
    const campaingId = req.params.id;
  
    try {
      const deletedCampaing = await campaing.findByIdAndDelete(campaingId);
      if (!deletedCampaing) {
        return res.status(404).json({ message: "Campanha não encontrada" });
      }
      res.status(200).json({ message: "Campanha deletada com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

export default Campaing;