import express from "express";
import Ceremony from "../controllers/Ceremony.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.get("/ceremony", Auth.authenticate, Auth.permission(1), Ceremony.listAllCeremonies);
routes.get("/ceremony/:id", Auth.authenticate, Auth.permission(1), Ceremony.searchCeremonyByID);
routes.post("/ceremony", Auth.authenticate, Auth.permission(1), Ceremony.createCeremony);
routes.put("/ceremony/:id", Auth.authenticate, Auth.permission(1), Ceremony.updateCeremony);
routes.put("/ceremony/:id/addParticipator", Auth.authenticate, Auth.permission(1), Ceremony.addParticipatorToCeremony);
routes.delete("/ceremony/:id", Auth.authenticate, Auth.permission(2), Ceremony.deleteCeremony);

export default routes