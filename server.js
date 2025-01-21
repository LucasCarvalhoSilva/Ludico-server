import "dotenv/config"
import app from "./src/app.js"

app.listen(process.env.PORT, () => {
  console.log("Servidor UP!!!");
  console.log("String de Conexão:", process.env.DB_CONNECTION_STRING);
})