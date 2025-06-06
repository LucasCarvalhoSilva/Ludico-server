import express from "express";
import OneShot from "../controllers/OneShot.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();
routes.get("/oneShot", Auth.authenticate, Auth.permission(1), OneShot.listOneShot);
routes.get("/oneShot/:id", Auth.authenticate, Auth.permission(1), OneShot.searchOneShotByID); 
routes.post("/oneShot", Auth.authenticate, Auth.permission(1), OneShot.createOneShot);
routes.put("/oneShot/:id", Auth.authenticate, Auth.permission(1), OneShot.updateOneShot);
routes.put("/oneShot/:id/addParticipator", Auth.authenticate, Auth.permission(1), OneShot.addParticipatorToOneShot);
routes.delete("/oneShot/:id", Auth.authenticate, Auth.permission(1), OneShot.deleteOneShot);


export default routes;