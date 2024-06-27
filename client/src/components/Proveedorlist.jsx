import { useEffect, useState } from "react";
import { Card, Typography, CardContent, Button, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Proveedorlist() {
  const [proveedores, setProveedores] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [elementosPorPagina, setElementosPorPagina] = useState(3);
  const navigate = useNavigate();

  const loadTasks = async () => {
    const response = await fetch("http://localhost:3000/api/proveedor");
    const data = await response.json();
    setProveedores(data);
  };

  const handleDelete = async (id_proveedor) => {
    try {
      await fetch(`http://localhost:3000/api/proveedor/${id_proveedor}`, {
        method: "DELETE",
      });
      setProveedores(
        proveedores.filter(
          (proveedor) => proveedor.id_proveedor !== id_proveedor
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const ultimoElementoIndex = paginaActual * elementosPorPagina;
  const primerElementoIndex = ultimoElementoIndex - elementosPorPagina;
  const elementosActuales = proveedores.slice(
    primerElementoIndex,
    ultimoElementoIndex
  );

  const handleChangePage = (event, nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  const totalPaginas = Math.ceil(proveedores.length / elementosPorPagina);

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1 style={{
          color: "white",
          backgroundColor: "#9c27b0",
          padding: "10px 20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          margin: "20px 0",
        }}>
        Lista de proveedores
      </h1>
      {elementosActuales.map((proveedor) => (
        <Card
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
          key={proveedor.id_proveedor}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ color: "white" }}>
              <Typography>
                <span style={{ color: "red" }}> ID del proveedor:</span> {proveedor.id_proveedor}
              </Typography>
              <Typography>
                <span style={{ color: "red" }}>Nombre:</span> {proveedor.nombre}
              </Typography>
              <Typography>
                <span style={{ color: "red" }}>Telefono:</span> {proveedor.telefono}
              </Typography>
              <Typography>
                <span style={{ color: "red" }}>Correo:</span> {proveedor.correo}
              </Typography>
              <Typography>
                <span style={{ color: "red" }}>Dirección:</span> {proveedor.telefono}
              </Typography>
              <Typography>
                <span style={{ color: "red" }}>Link de avatar:</span> {proveedor.avatar}
              </Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/proveedor/${proveedor.id_proveedor}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(proveedor.id_proveedor)}
                style={{ marginLeft: ".5rem" }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Pagination
        count={totalPaginas}
        page={paginaActual}
        onChange={handleChangePage}
        size="large"
        sx={{
          marginTop: "20px",
          justifyContent: "center",
          display: "flex",
          "& .MuiPaginationItem-root": {
            color: "#fff",
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          },
        }}
      />
    </>
  );
}

export default Proveedorlist;
