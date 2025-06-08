import express from "express";
import BoardGame from "../controllers/BoardGame.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.get("/boardgame", Auth.authenticate, Auth.permission(1), BoardGame.listAllBoardGames);
//routes.get("/boardgame/qrCode", BoardGame.searchBoardGameByQrCode);
routes.get("/boardgame/search", Auth.authenticate, Auth.permission(1), BoardGame.searchBoardGameByFilters);
routes.get("/boardgame/:id", Auth.authenticate, Auth.permission(1), BoardGame.searchBoardGameByID);
routes.post("/boardgame", Auth.authenticate, Auth.permission(1), BoardGame.createBoardGame);
routes.put("/boardgame/return/", Auth.authenticate, Auth.permission(1), BoardGame.returnBoardGame);
routes.put("/boardgame/:id", Auth.authenticate, Auth.permission(1), BoardGame.updateBoardGame);
routes.delete("/boardgame/:id", Auth.authenticate, Auth.permission(2), BoardGame.deleteBoardGame);

export default routes