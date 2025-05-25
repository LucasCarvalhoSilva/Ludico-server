import express from "express";
import Personage from "../controllers/Personage.js";

const routes = express.Router();

routes.get("/personage", Personage.listAllPersonages);
routes.post("/personage", Personage.createPersonage);


export default routes;