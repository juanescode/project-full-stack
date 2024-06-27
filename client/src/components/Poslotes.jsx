import { Grid, Card, Typography, CardContent, TextField, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskForm() {
  const [proveedores, setProveedores] = useState({
    vencimiento: "",
    stock: "",
    id_proveedor: "",
    id_producto: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("http://localhost:3000/api/lotes", {
      method: "POST",
      body: JSON.stringify(proveedores),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(false);
    navigate("/");
  };

  const handleChange = (e) => setProveedores({ ...proveedores, [e.target.name]: e.target.value });

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{ backgroundColor: "#1e272e", padding: "1rem" }}>
          <Typography variant="5" textAlign="center" color="white">
            Crear proveedor
          </Typography>
          <CardContent>
          {/* //   (vencimiento, stock, id_proveedor, id_producto */}
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Cual es el vencimiento"
                sx={{ display: "block", margin: "0.5rem 0" }}
                name="vencimiento"
                value={proveedores.vencimiento}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Cual es el stock"
                multiline
                rows={4}
                sx={{ display: "block", margin: "0.5rem 0" }}
                name="stock"
                value={proveedores.stock}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Cual es el id del proveedor"
                sx={{ display: "block", margin: "0.5rem 0" }}
                name="id_proveedor"
                value={proveedores.id_proveedor}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Cual es el id del producto"
                sx={{ display: "block", margin: "0.5rem 0" }}
                name="id_producto"
                value={proveedores.id_producto}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!proveedores.vencimiento || !proveedores.stock || !proveedores.id_proveedor || !proveedores.id_producto}
              >
                {loading ? <CircularProgress color="inherit" size={24} /> : "Guardar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default TaskForm;
