import mongoose from "mongoose";

async function databaseConnection() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Conexão com o banco de dados estabelecida!");
    return mongoose.connection;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    throw error;
  }
}

export default databaseConnection

