import mongoose from "mongoose";

const Schema = mongoose.Schema;

const lentSchema = new Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    boardgameLent: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'boardgame',
        required:[true, "é necessário informar qual jogo está sendo emprestado"]
    },
    lentTime: {
        type: Date
    },
    returnTime: {
        type: Date
    },
    participator: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'participator',
        required:[true, "é necessário informar quem está pegando o jogo emprestado"]
    },
    status: {
    type: String,
    enum: ["lent", "returned"]
  },
});

const lent = mongoose.model('lent', lentSchema);
export default lent