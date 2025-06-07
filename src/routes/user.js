import express from "express";
import User from "../controllers/User.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.get("/user", Auth.authenticate, Auth.permission(3), User.listAllUsers);
routes.post("/user", Auth.authenticate, Auth.permission(3), User.createUser);
routes.delete("/user/:id", Auth.authenticate, Auth.permission(3), User.deleteUser);


export default routes