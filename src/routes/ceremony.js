import express from "express";
import Ceremony from "../controllers/Ceremony.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.post("/ceremony", Auth.authenticate, Auth.permission(1), Ceremony.createCeremony);
//routes.delete("/ceremony/:id", Auth.authenticate, Auth.permission(2), Ceremony.deleteBoardGame);
routes.get("/ceremony", Auth.authenticate, Auth.permission(1), Ceremony.listAllCeremonies);
routes.get("/ceremony/:id", Auth.authenticate, Auth.permission(1), Ceremony.searchCeremonyByID);
//routes.get("/ceremony/search", Auth.authenticate, Auth.permission(1), Ceremony.searchBoardGameByName);

export default routes