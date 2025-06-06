import express from "express";
import Character from "../controllers/Character.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.get("/character", Auth.authenticate, Auth.permission(1), Character.listAllCharacters);
routes.post("/character", Auth.authenticate, Auth.permission(1), Character.createCharacter);
routes.put("/character/:id", Auth.authenticate, Auth.permission(1), Character.updateCharacter);
routes.delete("/character/:id", Auth.authenticate, Auth.permission(1), Character.deleteCharacter);

export default routes;