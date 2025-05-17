import { boardGame } from "../models/index.js";

const updateLentTime = async (boardGameId) => {
  const boardGameFound = await boardGame.findById(boardGameId);

  if (!boardGameFound) {
    throw new Error("Jogo não encontrado");
  }

  boardGameFound.quantityOfTimesBorrowed = boardGameFound.quantityOfTimesBorrowed++;
  await boardGameFound.save();

  return "Atualizado com sucesso";
};

export default updateLentTime;