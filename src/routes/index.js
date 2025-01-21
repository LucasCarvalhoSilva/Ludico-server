import express from "express";
import user from "./user.js";
import login from "./login.js";
import boardgame from "./boardgame.js"
import ceremony from "./ceremony.js"

const routes = (app) => {
  app.route('/').get((req, res) => res.status(200).send("Ludico Server! Welcome"));

  app.use(express.json(), user, login, ceremony, boardgame);
}

export default routes;