import mongoose from "mongoose";

const Schema = mongoose.Schema;

const campaingSchema = new Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  campaingName: {
    type: String,
    required: [true, "O nome da campanha é obrigatório"]
  },
  master: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  quantityOfPlayers: {
    type: Number,
    min: 1
  },
  system: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rpgSystem'
  },
  isOnline:{
    type:Boolean,
    required: true
  },
  place: {
    type: String
  },
  schedule:{
    type: String
  },
  sessionDuration:{
    type: String
  },
  history:{
    type: String,
  },
  age: {
    type: Number,
    min: [10, "A idade minima deve ser superior a 10"]
  },
  theme: {
    type: String
  },
  characters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'character'
  }],
  ticklish: {
    type: String
  },
})

const campaing = mongoose.model('campaing', campaingSchema)

export default campaing