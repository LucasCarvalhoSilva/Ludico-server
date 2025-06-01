import express from "express";
import ScapeRoomSession from "../controllers/ScapeRoomSession.js";

const routes = express.Router();
routes.get("/scapeRoomSession", ScapeRoomSession.listScapeRoomSessions);
routes.get("/scapeRoomSession/:id", ScapeRoomSession.searchScapeRoomSessionByID);
routes.post("/scapeRoomSession", ScapeRoomSession.createScapeRoomSession);
routes.put("/scapeRoomSession/:id", ScapeRoomSession.updateScapeRoomSession);
routes.put("/scapeRoomSession/:id/addParticipator", ScapeRoomSession.addParticipatorToScapeRoomSession);
routes.delete("/scapeRoomSession/:id", ScapeRoomSession.deleteScapeRoomSession);

export default routes;