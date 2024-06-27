import { useEffect, useState } from "react";
import { Card, Typography, CardContent } from "@mui/material";

function Proveedorlist() {
  const [proveedores, setProveedores] = useState([]);

  const loadTasks = async () => {
    const response = await fetch("http://localhost:3000/api/lotes");
    const data = await response.json();
    setProveedores(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1
        style={{
          color: "white",
          backgroundColor: "#9c27b0", // Color de fondo azul
          padding: "10px 20px", // Espaciado interno
          borderRadius: "10px", // Bordes redondeados
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra suave
          textAlign: "center", // Centrar el texto
          margin: "20px 0", // Margen exterior para separarlo de otros elementos
        }}
      >
        Lotes vencidos
      </h1>
      {proveedores.map((proveedor) => (
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
                <span style={{ color: "#e84118" }}>ID del Lote:</span>{" "}
                {proveedor.id_lote}
              </Typography>

              <Typography>
                <span style={{ color: "#e84118" }}>Fecha de vencimiento:</span>{" "}
                {proveedor.fecha_de_vencimiento}
              </Typography>

              <Typography>
                <span style={{ color: "#e84118" }}>Nombre de producto:</span>{" "}
                {proveedor.nombre_producto}
              </Typography>

              <Typography>
                <span style={{ color: "#e84118" }}>Nombre de proveedor:</span>{" "}
                {proveedor.nombre_proveedor}
              </Typography>

              <Typography>
                <span style={{ color: "#e84118" }}>Stock:</span>{" "}
                {proveedor.stock}
              </Typography>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default Proveedorlist;
