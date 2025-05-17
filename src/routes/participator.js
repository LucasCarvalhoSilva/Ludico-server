import express from "express";
import Participator from "../controllers/Participator.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.post("/participator",  Participator.createParticipator);
routes.get("/participator/search",  Participator.searchparticipatorByDocument);
routes.get("/participator/:id", Participator.searchparticipatorByID);

export default routes