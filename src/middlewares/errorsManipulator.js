import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import BadRequestError from "../errors/BadRequestError.js";
import ValidationError from "../errors/ValidationError.js";

// eslint-disable-next-line no-unused-vars
function errosManipulator(error, req, res, next) {
  if(error instanceof mongoose.Error.CastError) {
    new BadRequestError().sendResponse(res);
  } else if(error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendResponse(res)
  } else if(error instanceof BaseError) {
    error.sendResponse(res);
  } else {
    new BaseError().sendResponse(res);
  }
}

export default manipuladorDeErros;