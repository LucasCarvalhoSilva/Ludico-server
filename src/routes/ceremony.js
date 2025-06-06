import express from "express";
import Ceremony from "../controllers/Ceremony.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.get("/ceremony", Auth.authenticate, Auth.permission(1), Ceremony.listAllCeremonies);
routes.get("/ceremony/:id", Auth.authenticate, Auth.permission(1), Ceremony.searchCeremonyByID);
routes.get("/ceremony/:id/boardgame", Auth.authenticate, Auth.permission(1), Ceremony.searchBoardGameInCeremonyByQRCode);
routes.get("/ceremony/:id/participator",  Ceremony.searchParticipatorInCeremonyByIdentifier);
routes.post("/ceremony", Auth.authenticate, Auth.permission(1), Ceremony.createCeremony);
routes.post("/ceremony/:id/lent",Auth.authenticate, Auth.permission(1),  Ceremony.lent);
routes.put("/ceremony/:id", Auth.authenticate, Auth.permission(1), Ceremony.updateCeremony);
routes.put("/ceremony/:id/addOneShot", Auth.authenticate, Auth.permission(1), Ceremony.addOneShotToCeremony);
routes.put("/ceremony/:id/addParticipator", Auth.authenticate, Auth.permission(1), Ceremony.addParticipatorToCeremony);
routes.put("/ceremony/:id/addBoardGame", Auth.authenticate, Auth.permission(1), Ceremony.addBoardGameToCeremony);
routes.put("/ceremony/:id/removeBoardGame", Auth.authenticate, Auth.permission(1), Ceremony.removeBoardGameFromCeremony);
routes.put("/ceremony/:id/addScapeRoomSession", Auth.authenticate, Auth.permission(1), Ceremony.addScapeRoomSessionToCeremony);
routes.delete("/ceremony/:id", Auth.authenticate, Auth.permission(2), Ceremony.deleteCeremony);

export default routes