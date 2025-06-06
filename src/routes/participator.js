import express from "express";
import Participator from "../controllers/Participator.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.get("/participator", Auth.authenticate, Auth.permission(1), Participator.listAllparticipators);
routes.get("/participator/search", Auth.authenticate, Auth.permission(1),  Participator.searchparticipatorByDocument);
routes.get("/participator/:id", Auth.authenticate, Auth.permission(1), Participator.searchparticipatorByID);
routes.post("/participator", Auth.authenticate, Auth.permission(1),  Participator.createParticipator);
routes.put("/participator/:id", Auth.authenticate, Auth.permission(1), Participator.updateParticipator);
routes.delete("/participator/:id", Auth.authenticate, Auth.permission(1), Participator.deleteparticipator);

export default routes