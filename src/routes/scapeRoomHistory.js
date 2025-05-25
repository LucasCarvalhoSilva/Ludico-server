import express from "express";
import ScapeRoomHistory from "../controllers/ScapeRoomHistory.js";

const routes = express.Router();
routes.get("/scapeRoomHistory", ScapeRoomHistory.listScapeRoomHistory);
routes.get("/scapeRoomHistory/:id", ScapeRoomHistory.searchScapeRoomHistoryByID);
routes.post("/scapeRoomHistory", ScapeRoomHistory.createScapeRoomHistory);
routes.put("/scapeRoomHistory/:id", ScapeRoomHistory.updateScapeRoomHistory);
routes.delete("/scapeRoomHistory/:id", ScapeRoomHistory.deleteScapeRoomHistory);

export default routes;