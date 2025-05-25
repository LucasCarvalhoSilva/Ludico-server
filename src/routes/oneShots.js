import express from "express";
import OneShot from "../controllers/OneShot.js";

const routes = express.Router();
routes.get("/rpgSystem", OneShot.listRpgSystem);
routes.post("/rpgSystem", OneShot.createRpgSystem);


export default routes;