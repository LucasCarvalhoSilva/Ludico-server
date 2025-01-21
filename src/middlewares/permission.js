import jwt from "jsonwebtoken";
import BaseError from "../errors/BaseError.js";

class Auth{

  static authenticate (req, res, next) {
    const token = req.headers['authorization'];
    if(!token) {
      next(new BaseError('Acesso Negado pois não foi fornecido um token', 401).sendResponse());
    }
    
    try {
      const tokenWithoutPrefix = token.slice(7);
      const decoded = jwt.verify(tokenWithoutPrefix, process.env.KEY );
      req.user = decoded;
      console.log("Permissao, dados do usuario", decoded)
      next()
    }catch (error) {
      console.log(error)
      next(error)
    }
  }
  
  static permission (requiredRole) {
    return (req, res, next) => {
      const { role } = req.user;
      
      if (role < requiredRole) {
        next(new BaseError('Permissao negada, você não tem permissão para realizar a ação solicitada').enviarResposta());
      }
      next();
    }
  }
  
}
export default Auth