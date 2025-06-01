import mongoose from "mongoose";

const Schema = mongoose.Schema;

const scapeRoomSessionSchema = new Schema({
  id:{ type: mongoose.Schema.ObjectId},
  isFinished: {
    type: Boolean
  },
  ceremony:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"ceremony"
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
  }]
})

const scapeRoomSession = mongoose.model("scapeRoomSessions", scapeRoomSessionSchema)

export default scapeRoomSession