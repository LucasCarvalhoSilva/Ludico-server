import express from "express";
import Lent from "../controllers/Lent.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.post("/lent", Lent.createLent);
//routes.delete("/lent/:id", Auth.authenticate, Auth.permission(2), Ceremony.deleteBoardGame);
//routes.get("/lent", Auth.authenticate, Auth.permission(1), Ceremony.listAllCeremonies);
//routes.get("/lent/:id", Auth.authenticate, Auth.permission(1), Ceremony.searchCeremonyByID);
//routes.get("/lent/search", Auth.authenticate, Auth.permission(1), Ceremony.searchBoardGameByName);

export default routes