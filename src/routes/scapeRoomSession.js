import express from "express";
import ScapeRoomSession from "../controllers/ScapeRoomSession.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();
routes.get("/scapeRoomSession", Auth.authenticate, Auth.permission(1), ScapeRoomSession.listScapeRoomSessions);
routes.get("/scapeRoomSession/:id", Auth.authenticate, Auth.permission(1), ScapeRoomSession.searchScapeRoomSessionByID);
routes.post("/scapeRoomSession", Auth.authenticate, Auth.permission(1), ScapeRoomSession.createScapeRoomSession);
routes.put("/scapeRoomSession/:id", Auth.authenticate, Auth.permission(1), ScapeRoomSession.updateScapeRoomSession);
routes.put("/scapeRoomSession/:id/addParticipator", Auth.authenticate, Auth.permission(1), ScapeRoomSession.addParticipatorToScapeRoomSession);
routes.delete("/scapeRoomSession/:id", Auth.authenticate, Auth.permission(1), ScapeRoomSession.deleteScapeRoomSession);

export default routes;