import { boardGame } from "../models/index.js";

const updateNumbersOfGamesPlayed = async (boardGameId, playedTimes) => {
  const boardGameFound = await boardGame.findById(boardGameId);

  if (!boardGameFound) {
    throw new Error("Jogo não encontrado");
  }

  boardGameFound.quantityOfTimesPlayed = boardGameFound.quantityOfTimesPlayed + playedTimes;
  await boardGameFound.save();

  return "Atualizado com sucesso";
};

export default updateNumbersOfGamesPlayed;