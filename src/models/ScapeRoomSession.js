import mongoose from "mongoose";

const Schema = mongoose.Schema;

const scapeRoomSessionSchema = new Schema({
  id:{ type: mongoose.Schema.ObjectId},
  isFinished: {
    type: Boolean
  },
  startedAt: {
    type: String
  },
  finishedAt: {
    type: String
  },
  participators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"participator"
  }],
  history: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"scapeRoomHistory"
  },
  room: {
    type: String
  }
})

const scapeRoomSession = mongoose.model("scapeRoomSessions", scapeRoomSessionSchema)

export default scapeRoomSession