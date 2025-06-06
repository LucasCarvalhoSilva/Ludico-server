import express from "express";
import RpgSystem from "../controllers/RpgSystem.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();
routes.get("/rpgSystem", Auth.authenticate, Auth.permission(1), RpgSystem.getRpgSystem);
routes.post("/rpgSystem", Auth.authenticate, Auth.permission(1), RpgSystem.createRpgSystem);
routes.put("/rpgSystem/:id", Auth.authenticate, Auth.permission(1), RpgSystem.updateRpgSystem);
routes.delete("/rpgSystem/:id", Auth.authenticate, Auth.permission(1), RpgSystem.deleteCreateRpgSystem);


export default routes;