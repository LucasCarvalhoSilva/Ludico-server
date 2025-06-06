import express from "express";
import Role from "../controllers/Role.js";
import Auth from "../middlewares/permission.js";

const routes = express.Router();

routes.get("/role", Auth.authenticate, Auth.permission(1), Role.listAllRoles);


export default routes