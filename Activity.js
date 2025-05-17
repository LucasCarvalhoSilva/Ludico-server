import mongoose from "mongoose";

const Schema = mongoose.Schema;

const activitySchema = new Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  name: {
    type: String,
    required: [true, "O nome da atividade é obrigatória"]
  },
  ceremony: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ceremony"
  },
})

const activity = mongoose.model("activity", activitySchema)

export default activity