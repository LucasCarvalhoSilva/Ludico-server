import { boardGame } from "../models/index.js";

const changeGameDisponible = async (boardGameId) => {
  const boardGameFound = await boardGame.findById(boardGameId);

  if (!boardGameFound) {
    throw new Error("Jogo não encontrado");
  }

  boardGameFound.isDisponible = !boardGameFound.isDisponible;
  await boardGameFound.save();

  return "Atualizado com sucesso";
};

export default changeGameDisponible;