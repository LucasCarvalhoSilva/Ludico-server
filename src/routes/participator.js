import express from "express";
import Participator from "../controllers/Participator.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.get("/participator", Participator.listAllparticipators);
routes.get("/participator/search",  Participator.searchparticipatorByDocument);
routes.get("/participator/:id", Participator.searchparticipatorByID);
routes.post("/participator",  Participator.createParticipator);
routes.put("/participator/:id", Participator.updateParticipator);
routes.delete("/participator/:id", Participator.deleteparticipator);

export default routes