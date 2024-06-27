import { useEffect, useState } from "react";
import { Card, Typography, CardContent, Pagination } from "@mui/material";

function Proveedorlist() {
  const [proveedores, setProveedores] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [elementosPorPagina, setElementosPorPagina] = useState(3);

  const loadTasks = async () => {
    const response = await fetch("http://localhost:3000/api/lotes");
    const data = await response.json();
    setProveedores(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const indiceDelUltimoElemento = paginaActual * elementosPorPagina;
  const indiceDelPrimerElemento = indiceDelUltimoElemento - elementosPorPagina;
  const elementosActuales = proveedores.slice(indiceDelPrimerElemento, indiceDelUltimoElemento);

  const totalPaginas = Math.ceil(proveedores.length / elementosPorPagina);

  const handleChangePage = (event, newValue) => {
    setPaginaActual(newValue);
  };

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
        Lotes vencidos
      </h1>
      {elementosActuales.map((proveedor) => (
        <Card
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
          key={proveedor.id_lote}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ color: "white" }}>
              <Typography>
                <span style={{ color: "#e84118" }}>ID del Lote:</span> {proveedor.id_lote}
              </Typography>
              <Typography>
                <span style={{ color: "#e84118" }}>Fecha de vencimiento:</span> {proveedor.fecha_de_vencimiento}
              </Typography>
              <Typography>
                <span style={{ color: "#e84118" }}>Nombre de producto:</span> {proveedor.nombre_producto}
              </Typography>
              <Typography>
                <span style={{ color: "#e84118" }}>Nombre de proveedor:</span> {proveedor.nombre_proveedor}
              </Typography>
              <Typography>
                <span style={{ color: "#e84118" }}>Stock:</span> {proveedor.stock}
              </Typography>
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

