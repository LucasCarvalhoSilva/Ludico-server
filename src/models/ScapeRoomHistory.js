import mongoose from "mongoose";

const Schema = mongoose.Schema

const scapeRoomHistorySchema = new Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  name: { 
    type: String,
    required: [true, "O nome da história do escape é obrigatória"]
  },
  duration: {
    type: String
  },
  minPlayerQuantity: {
    type: Number,
    required: [true, "A quantidade minima de jogadores é obrigatória"],
    min: 0
  },
  maxPlayerQuantity: {
    type: Number,
    required: [true, "A quantidade minima de jogadores é obrigatória"],
    min: 0
  },
  description: {
    type: String
  },
  theme: {
    type: [String]
  }
})

const scapeRoomHistory = mongoose.model('scapeRoomHistory', scapeRoomHistorySchema)

export default scapeRoomHistory