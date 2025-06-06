import express from "express";
import Lent from "../controllers/Lent.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.post("/lent", Auth.authenticate, Auth.permission(1), Lent.createLent);
routes.get("/lent", Auth.authenticate, Auth.permission(1), Lent.listAllLents);
routes.get("/lent/unreturned", Auth.authenticate, Auth.permission(1), Lent.listUnreturnedLents);
routes.put("/lent/:id", Auth.authenticate, Auth.permission(1), Lent.updateLent);

export default routes