import express from "express";
import BoardGame from "../controllers/BoardGame.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.post("/boardgame", Auth.authenticate, Auth.permission(1), BoardGame.createBoardGame);
routes.delete("/boardgame/:id", Auth.authenticate, Auth.permission(2), BoardGame.deleteBoardGame);
routes.get("/boardgame", Auth.authenticate, Auth.permission(1), BoardGame.listAllBoardGames);
routes.get("/boardgame/:id", Auth.authenticate, Auth.permission(1), BoardGame.searchBoardGameByID);
routes.get("/boardgame/search", Auth.authenticate, Auth.permission(1), BoardGame.searchBoardGameByName);

export default routes