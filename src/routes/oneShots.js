import express from "express";
import OneShot from "../controllers/OneShot.js";

const routes = express.Router();
routes.get("/oneShot", OneShot.listOneShot);
routes.get("/oneShot/:id", OneShot.searchOneShotByID); 
routes.post("/oneShot", OneShot.createOneShot);
routes.put("/oneShot/:id", OneShot.updateOneShot);
routes.put("/oneShot/:id/addParticipator", OneShot.addParticipatorToOneShot);
routes.delete("/oneShot/:id", OneShot.deleteOneShot);


export default routes;