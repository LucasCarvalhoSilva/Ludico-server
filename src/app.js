import express from "express";
import databaseConnection from "./config/dbConnect.js";
import routes from "./routes/index.js";
import cors from 'cors';

// Configurar o CORS
const corsOptions = {
  origin: '*', // Specify the exact origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
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