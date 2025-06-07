import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { user } from "../models/index.js"
import UserOrPasswordInvalid from "../errors/UserOrPasswordInvalid.js";

class Login {
  static async login (req, res, next) {
    try{
      console.log("Recebido:", req.body);
      const {username, password} = req.body;

      const userLogIn = await user.findOne({username}).populate('role');

      console.log(userLogIn)
      if(!userLogIn) {
        return next(new UserOrPasswordInvalid().sendResponse(res));
      }

      const passwordIsValid = await bcrypt.compare(password, userLogIn.password);
      if(!passwordIsValid) {
        return next(new UserOrPasswordInvalid().sendResponse(res));
      }
      
      if (!userLogIn.role) {
        return res.status(400).json({
          message: "O usuário não possui uma role associada. Contate o administrador.",
        });
      }

      const token = jwt.sign(
        {
          id: userLogIn._id,
          role: userLogIn.role.role,
          roleDescription: userLogIn.role.description,
          username: userLogIn.username,
          user: userLogIn.name
        },
        process.env.KEY,
        {expiresIn: '12h'}
      );

      console.log("Token do usuario", token)

      res.status(200).json({
        message: 'Login realizado com sucesso',
        role: userLogIn.role.role,
        token
      })
    } catch(error) {
      next(error)
    }
  } 
    
}

export default Login;