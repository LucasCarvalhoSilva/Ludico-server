import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  name: {
    type: String,
    required: [true, "nome do usuário é obrigatório"]
  },
  username: {
     type: String,
     required: [true, "username é obrigatório"]
  },
  status: {
    type: String,
    required: [true, "status é obrigatório"]
  },
  password: {
    type: String,
    required: [true, "password é obrigatório"]
  },
  email: {
    type: String,
    required: [true, "email é obrigatório"]
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userRole',
    required:[true, "role de acesso é obrigatório"]
  }
});

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const user = mongoose.model('user', userSchema);

export default user;