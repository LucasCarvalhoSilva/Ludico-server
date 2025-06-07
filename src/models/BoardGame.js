import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const boardGameSchema = new Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  boardGameName: {
    type: String,
    required: [true, "O nome do boardgame é obrigatório"]
  },
  minAge: {
    type: Number,
    required: [true, "A idade mínima é obrigatória"]
  },
  qrCode: {
    type: String,
    required: [true, "O QR Code do boardgame é obrigatório"]
  },
  minPlayerQuantity: {
    type: Number,
    required: [true, "A quantidade mínima de jogadores é obrigatória"]
  },
  maxPlayerQuantity: {
    type: Number,
    required: [true, "A quantidade máxima de jogadores é obrigatória"]
  },
  publisher: {
    type: String,
    required: [true, "A editora é obrigatória"]
  },
  designer: {
    type: String
  },
  bggRank: {
    type: Number
  },
  mainCategory: {
    type: String
  },
  description: {
    type: String
  },
  mechanics: {
    type: [String]
  },
  themes: {
    type: [String]
  },
  expansions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'boardgames'
  },
  isExpasion: {
    type: Boolean,
    required: true
  },
  quantityOfTimesBorrowed: {
    type: Number,
    default: 0
  },
  quantityOfTimesPlayed: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  bestQuantityOfPlayers: {
    type: Number,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  playedTime: {
    type: Number,
    required: true
  },
  owner: {
    type: String
  },
  storageLocation: {
    type: String,
  }

})

const boardGame = mongoose.model('boardgame', boardGameSchema);

export default boardGame;