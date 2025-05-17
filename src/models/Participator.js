import mongoose from "mongoose";

const Schema = mongoose.Schema;

const participatorSchema = new Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  name: {
    type: String,
    required:[true, "O nome do participante é obrigatório"]
  },
  identifier: {
    type: String,
    required: [true, "RA ou CPF obrigatório"]
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female"]
  },
  familyIncome: {
    type: Number
  },
  institution: {
    type: String
  },
  education: {
    type: String
  },
  playedBgGames: [{
    type: mongoose.Schema.Types.ObjectId
  }]
})

const participator = mongoose.model("participator", participatorSchema)

export default participator