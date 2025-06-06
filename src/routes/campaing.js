import express from "express";
import Campaing from "../controllers/Campaing.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.get("/campaing", Auth.authenticate, Auth.permission(1), Campaing.listAllCampaings);
routes.get("/campaing/:id", Auth.authenticate, Auth.permission(1), Campaing.searchCampaingByID);
routes.post("/campaing", Auth.authenticate, Auth.permission(1), Campaing.createCampaing);
routes.put("/campaing/:id", Auth.authenticate, Auth.permission(1), Campaing.updateCampaing);
routes.delete("/campaing/:id", Auth.authenticate, Auth.permission(1), Campaing.deleteCampaing);

export default routes;