import { useEffect, useState } from "react";
import { Card, Typography, CardContent} from "@mui/material";

function Proveedorlist() {
  const [proveedores, setProveedores] = useState([]);


  const loadTasks = async () => {
    const response = await fetch("http://localhost:3000/api/loteslistar");
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
        Listar lotes
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
                <span style={{ color: "red" }}> ID del lote:</span>{" "}
                {proveedor.id_lote}
              </Typography>

              <Typography>
                <span style={{ color: "red" }}>Vencimiento:</span> {proveedor.vencimiento}
              </Typography>

              <Typography>
                <span style={{ color: "red" }}>Stock:</span>{" "}
                {proveedor.stock}
              </Typography>

              <Typography>
                <span style={{ color: "red" }}>Id_proveedor:</span> {proveedor.id_proveedor}
              </Typography>
              <Typography>
                <span style={{ color: "red" }}>Id_producto:</span>{" "}
                {proveedor.id_producto}
              </Typography>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default Proveedorlist;
