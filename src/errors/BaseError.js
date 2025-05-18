class BaseError extends Error {
  constructor(message = "Erro interno do servidor") {
    super();
    this.message = message;
    
  }

  sendResponse(res) {
    console.log(res)
  }

}

export default BaseError;