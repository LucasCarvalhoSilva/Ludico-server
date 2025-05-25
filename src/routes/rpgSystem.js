import express from "express";
import RpgSystem from "../controllers/RpgSystem.js";

const routes = express.Router();
routes.get("/rpgSystem", RpgSystem.getRpgSystem);
routes.post("/rpgSystem", RpgSystem.createRpgSystem);
routes.put("/rpgSystem/:id", RpgSystem.updateRpgSystem);
routes.delete("/rpgSystem/:id", RpgSystem.deleteCreateRpgSystem);


export default routes;