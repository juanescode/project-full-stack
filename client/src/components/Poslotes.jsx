import {
  Grid,
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Poslotes() {
  const [lotes, setLotes] = useState({
    vencimiento: "",
    stock: "",
    id_proveedor: "",
    id_producto: "",
  });
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const res = await fetch("http://localhost:3000/api/lotesagregar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vencimiento: lotes.vencimiento,
        stock: lotes.stock,
        idProveedor: lotes.id_proveedor,
        idProducto: lotes.id_producto,
      }),
    }).catch((error) => {
      console.error("Error al conectar con el servidor:", error);
    });

    if (!res.ok) {
      console.error("Error en la respuesta del servidor:", res.status);
    } else {
      const data = await res.json();
      console.log("Respuesta del servidor:", data);

      setLoading(false);
      Navigate("/loteslistar");
    }
  };

  const handleChange = (e) =>
    setLotes({ ...lotes, [e.target.name]: e.target.value });

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#1e272e",
            padding: "1rem",
          }}
        >
          <Typography variant="5" textAlign="center" color="white">
            Crear lote nuevo
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Cual es el vencimiento"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="vencimiento"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Cual es el stock"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="stock"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Cual es el id del proveedor"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="id_proveedor"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Cual es el id del producto"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="id_producto"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  !lotes.vencimiento ||
                  !lotes.stock ||
                  !lotes.id_proveedor ||
                  !lotes.id_producto
                }
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Guardar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}