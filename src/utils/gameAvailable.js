import { boardGame } from "../models/index.js";

const gameAvailable = async (boardGameId) => {
  console.log("Chegou no gameAvailable", boardGameId);
  
  const boardGameFound = await boardGame.findById(boardGameId);
  
  if (!boardGameFound) {
    throw new Error("Jogo não econtrado");
  }
  
  return boardGameFound.isAvailable;

}

export default gameAvailable;