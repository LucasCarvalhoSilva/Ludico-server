import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const userRoleSchema = new Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  role: {
    type: Number,
    required: true,
    enum: [1, 2, 3] // 1 voluntario escape, 2 bolsista, 3 professor coordenador
  },
  description: {
    type: String,
    required: true
  }
});

const userRole = mongoose.model('userRole', userRoleSchema);

export default userRole