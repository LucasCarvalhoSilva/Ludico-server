import mongoose from "mongoose";

const Schema = mongoose.Schema;

const oneShotSchema = new Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  adventure:{
    type: String,
    required: true
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
  players:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'participator'
  }],
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
  themes: {
    type: [String]
  },
  characters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'character'
  }]
})

const oneShot = mongoose.model('oneShot', oneShotSchema)

export default oneShot