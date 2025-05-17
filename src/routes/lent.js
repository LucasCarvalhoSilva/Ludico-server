import express from "express";
import Lent from "../controllers/Lent.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.post("/lent", Lent.createLent);
//routes.delete("/lent/:id", Auth.authenticate, Auth.permission(2), Ceremony.deleteBoardGame);
routes.get("/lent", Lent.listAllLents);
//routes.get("/lent/:id", Auth.authenticate, Auth.permission(1), Ceremony.searchCeremonyByID);
//routes.get("/lent/search", Auth.authenticate, Auth.permission(1), Ceremony.searchBoardGameByName);
routes.get("/lent/unreturned", Lent.listUnreturnedLents);
routes.put("/lent/:id", Lent.updateLent);

export default routes