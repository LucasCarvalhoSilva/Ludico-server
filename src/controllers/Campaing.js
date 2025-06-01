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
  
  
}

export default Campaing;