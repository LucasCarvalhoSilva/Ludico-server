import mongoose from "mongoose";

const Schema = mongoose.Schema;

const characterSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId},
  name: {
    type: String,
    required: [true, 'O nome do personagem é obrigatório']
  },
  race: {
    type: String
  },
  class: {
    type: String
  },
  heritage: {
    type: String
  },
  religion: {
    type: String
  },
  gender: {
    type: String
  },
  age: {
    type: Number,
    min: 0
  },
  observations: {
    type: String
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'participator'
  },
  campaing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'campaing'
  },
  system: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rpgSystem'
  },
  background: {
    type: String
  },
  equipment: {
    type:[String]
  },
  skill: {
    type:[String]
  }
})

const character = mongoose.model('character', characterSchema)

export default character