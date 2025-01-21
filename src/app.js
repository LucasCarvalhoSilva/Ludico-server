import express from "express";
import databaseConnection from "./config/dbConnect.js";
import routes from "./routes/index.js";
import cors from 'cors';

// Configurar o CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Substitua pelo endereço do seu frontend (Next.js)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

const connection = await databaseConnection();

connection.on("error", (error) => {
  console.log("Erro de conexão com o banco de dados: ", error);
})

connection.once("open", () => {
  console.log("Conexão com o banco feita com sucesso!");
})

const app = express();

app.use(cors(corsOptions));
routes(app);


export default app;