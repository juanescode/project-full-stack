import {
  Grid,
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TaskForm() {
  const [proveedores, setProveedores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (editing) {
      await fetch(`http://localhost:3000/api/proveedor/${params.id_proveedor}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proveedores),
      });
    } else {
      await fetch("http://localhost:3000/api/proveedor", {
        method: "POST",
        body: JSON.stringify(proveedores),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    setLoading(false);
    navigate("/");
  };

  const handleChange = (e) =>
    setProveedores({ ...proveedores, [e.target.name]: e.target.value });

  const loadTask = async (id_proveedor) => {
    console.log(id_proveedor);
    const res = await fetch(`http://localhost:3000/api/proveedor/${id_proveedor}`);
    const data = await res.json();
    console.log(data);
    setProveedores({ nombre: data.nombre, telefono: data.telefono, correo: data.correo, direccion: data.direccion, avatar: data.avatar});
    setEditing(true);
  };

  useEffect(() => {
    if (params.id_proveedor) {
      loadTask(params.id_proveedor);
    }
  }, [params.id_proveedor]);

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
            {editing ? "Editar proveedor" : "Crear proveedor"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Cual es tu nombre"
                sx={{ display: "block", margin: "0.5rem 0" }}
                name="nombre"
                value={proveedores.nombre}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Cual es tu telefono"
                multiline
                rows={4}
                sx={{ display: "block", margin: "0.5rem 0" }}
                name="telefono"
                value={proveedores.telefono}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Cual es tu correo"
                sx={{ display: "block", margin: "0.5rem 0" }}
                name="correo"
                value={proveedores.correo}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Cual es tu direccion"
                sx={{ display: "block", margin: "0.5rem 0" }}
                name="direccion"
                value={proveedores.direccion}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Cual es tu avatar"
                sx={{ display: "block", margin: "0.5rem 0" }}
                name="avatar"
                value={proveedores.avatar}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!proveedores.nombre || !proveedores.telefono || !proveedores.correo || !proveedores.direccion || !proveedores.avatar}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  editing ? "Edit" : "Save"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default TaskForm;