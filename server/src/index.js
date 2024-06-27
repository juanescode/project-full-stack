import express from "express";
const app = express();
import ProveedoresRouter from "./routes/proveedores.routes.js";
import { pool } from "./db.js";
import { PORT } from "./config.js";
import morgan from "morgan";
import cors from "cors";

try {
  await pool.query("SELECT 1");
  console.log("La conexion a la base de datos fue exitosa");
} catch (error) {
  console.log("La conexion tuvo un error:", error);
}

app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", ProveedoresRouter);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint no encontrado",
  });
});

app.listen(PORT, () => {
  console.log("El servidor esta corriendo en el puerto", PORT);
});

export default app;


