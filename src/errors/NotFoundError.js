import BaseError from "./BaseError.js";

class NotFoundError extends BaseError {
  constructor(message = "Pagina não encontrada") {
    super(message, 404);
  }
}

export default NotFoundError;