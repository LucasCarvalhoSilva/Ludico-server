import { boardGame } from "../models/index.js";

const gameAvailable = async (boardGameId) => {
  const boardGameFound = await boardGame.findById(boardGameId);
  
  if (!boardGameFound) {
    throw new Error("Jogo não econtrado");
  }
  
  return boardGameFound.isDisponible;

}

export default gameAvailable;