import express from "express";
import User from "../controllers/User.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.post("/user", Auth.authenticate, Auth.permission(3), User.createUser);
routes.get("/user", Auth.authenticate, Auth.permission(3), User.listAllUsers);

export default routes