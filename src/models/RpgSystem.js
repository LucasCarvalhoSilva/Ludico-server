import mongoose from "mongoose";

const Schema = mongoose.Schema;

const rpgSystemSchema = new Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  name: {
    type: String,
    required: [true, "O nome do sistema de RPG é obrigatório"]
  },
  author: {
    type: String
  },
  category: {
    type: String
  },
  theme: {
    type: String
  }, 
  restriction: {
    type: String
  },
  class: {
    type: [String]
  }
})

const rpgSystem = mongoose.model('rpgSystem', rpgSystemSchema)

export default rpgSystem