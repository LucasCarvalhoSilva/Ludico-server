import express from "express";
import user from "./user.js";
import login from "./login.js";
import boardgame from "./boardgame.js";
import ceremony from "./ceremony.js";
import lent from "./lent.js";
import participator from "./participator.js";
import rpgSystem from "./rpgSystem.js";
import character from "./character.js";
import oneShot from "./oneShots.js";
import scapeRoomHistory from "./scapeRoomHistory.js";
import scapeRoomSession from "./scapeRoomSession.js";
import campaing from "./campaing.js";
import role from "./role.js";	

const routes = (app) => {
  app.route('/').get((req, res) => res.status(200).send("Ludico Server! Welcome"));

  app.use(express.json(), user, login, ceremony, boardgame, lent, participator, rpgSystem, character, oneShot, scapeRoomHistory, scapeRoomSession, campaing, role);
}

export default routes;