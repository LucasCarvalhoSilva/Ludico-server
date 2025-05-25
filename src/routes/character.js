import express from "express";
import Character from "../controllers/Character.js";

const routes = express.Router();

routes.get("/character", Character.listAllCharacters);
routes.post("/character", Character.createCharacter);
routes.put("/character/:id", Character.updateCharacter);
routes.delete("/character/:id", Character.deleteCharacter);


export default routes;