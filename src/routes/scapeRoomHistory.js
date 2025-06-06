import express from "express";
import ScapeRoomHistory from "../controllers/ScapeRoomHistory.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();
routes.get("/scapeRoomHistory", Auth.authenticate, Auth.permission(1), ScapeRoomHistory.listScapeRoomHistory);
routes.get("/scapeRoomHistory/:id", Auth.authenticate, Auth.permission(1), ScapeRoomHistory.searchScapeRoomHistoryByID);
routes.post("/scapeRoomHistory", Auth.authenticate, Auth.permission(1), ScapeRoomHistory.createScapeRoomHistory);
routes.put("/scapeRoomHistory/:id", Auth.authenticate, Auth.permission(1), ScapeRoomHistory.updateScapeRoomHistory);
routes.delete("/scapeRoomHistory/:id", Auth.authenticate, Auth.permission(1), ScapeRoomHistory.deleteScapeRoomHistory);

export default routes;