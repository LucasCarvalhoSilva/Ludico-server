import mongoose from "mongoose";

const Schema = mongoose.Schema;

const  ceremonySchema = new Schema({
  id:{ type: mongoose.Schema.Types.ObjectId},
  eventName: {
    type: String,
    required: [true, "Nome do evento é obrigatório"]
  },
  eventDate: {
    type: Date,
    required: [true, "Data do evento é obrigatório"]
  },
  eventCity: {
    type: String
  },
  eventPlace: {
    type: String
  },
  participatorQuantity: {
    type: Number,
    min: 0
  },
  participators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"participator"
  }],
  oneShotAvailables: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "oneShot"
  }],
  boardGamesAvailables: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "boardgame"
  }],
  scapeRoomSessions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "scapeRoomSessions"
  }],
  eventStartTime: {
    type: String,
    required: [true, "Horário de Inicio do evento é obrigatório"]
  },
  eventEndTime: {
    type: String,
    required: [true, "Horário de Encerramento do evento é obrigatório"]
  }
})

const ceremony = mongoose.model("ceremony", ceremonySchema)

export default ceremony