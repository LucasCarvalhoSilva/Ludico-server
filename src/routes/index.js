import express from "express";
import user from "./user.js";
import login from "./login.js";
import boardgame from "./boardgame.js";
import ceremony from "./ceremony.js";
import lent from "./lent.js";
import participator from "./participator.js"

const routes = (app) => {
  app.route('/').get((req, res) => res.status(200).send("Ludico Server! Welcome"));

  app.use(express.json(), user, login, ceremony, boardgame, lent, participator);
}

export default routes;