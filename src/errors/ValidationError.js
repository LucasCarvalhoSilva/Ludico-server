import BadRequestError from "./BadRequestError.js";

class ValidationError extends BadRequestError {
  constructor(error) {
    const errorMessage = Object.values(error.errors)
      .map(error => error.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados ${errorMessage}`);
  }
}

export default ValidationError;