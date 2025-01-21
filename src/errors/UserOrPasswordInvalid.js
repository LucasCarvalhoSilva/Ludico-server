import BaseError from "./BaseError.js";

class UserOrPasswordInvalid extends BaseError {
  constructor(message = "Usuario ou senha Inválidos") {
    super(message, 401);
  }
}

export default UserOrPasswordInvalid;