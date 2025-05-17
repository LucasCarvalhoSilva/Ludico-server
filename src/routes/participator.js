import express from "express";
import Participator from "../controllers/Participator.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.post("/participator",  Participator.createParticipator);
//routes.delete("/participator/:id", Auth.authenticate, Auth.permission(2), Ceremony.deleteBoardGame);
//routes.get("/participator", Auth.authenticate, Auth.permission(1), Ceremony.listAllCeremonies);
routes.get("/participator/:id", Participator.searchparticipatorByID);
//routes.get("/participator/search", Auth.authenticate, Auth.permission(1), Ceremony.searchBoardGameByName);

export default routes