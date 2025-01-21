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
  staredAt: {
    type: Date
  },
  finishedAt: {
    type: Date
  },
  participators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"participator"
  }]
})

const scapeRoomSession = mongoose.model("scapeRoomSessions", scapeRoomSessionSchema)

export default scapeRoomSession