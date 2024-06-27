import { useEffect, useState } from "react";
import { Card, Typography, CardContent, Pagination, Button } from "@mui/material";

function LotesListar() {
  const [lotes, setLotes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [elementosPorPagina, setElementosPorPagina] = useState(3);

  const cargarLotes = async () => {
    const response = await fetch("http://localhost:3000/api/loteslistar");
    const data = await response.json();
    setLotes(data);
  };

  const handleDelete = async (id_lote) => {
    try {
      await fetch(`http://localhost:3000/api/lotes/${id_lote}`, {
        method: "DELETE",
      });
      setLotes(lotes.filter((lote) => lote.id_lote !== id_lote));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarLotes();
  }, []);

  const ultimoElementoIndex = paginaActual * elementosPorPagina;
  const primerElementoIndex = ultimoElementoIndex - elementosPorPagina;
  const elementosActuales = lotes.slice(primerElementoIndex, ultimoElementoIndex);

  const handleChangePage = (event, nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  const totalPaginas = Math.ceil(lotes.length / elementosPorPagina);

  return (
    <>
      <h1 style={{ color: "white", backgroundColor: "#9c27b0", padding: "10px 20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", textAlign: "center", margin: "20px 0", }}>
        Listar Lotes
      </h1>
      {elementosActuales.map((lote) => (
        <Card style={{ marginBottom: ".7rem", backgroundColor: "#1e272e" }} key={lote.id_lote}>
          <CardContent style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ color: "white" }}>
              <Typography><span style={{ color: "red" }}>ID del lote:</span> {lote.id_lote}</Typography>
              <Typography><span style={{ color: "red" }}>Vencimiento:</span> {lote.vencimiento}</Typography>
              <Typography><span style={{ color: "red" }}>Stock:</span> {lote.stock}</Typography>
              <Typography><span style={{ color: "red" }}>Id_proveedor:</span> {lote.id_proveedor}</Typography>
              <Typography><span style={{ color: "red" }}>Id_producto:</span> {lote.id_producto}</Typography>
            </div>
            <Button variant="contained" color="error" onClick={() => handleDelete(lote.id_lote)} style={{ marginLeft: ".5rem" }}>
              Eliminar
            </Button>
          </CardContent>
        </Card>
      ))}
      <Pagination count={totalPaginas} page={paginaActual} onChange={handleChangePage} size="large" sx={{ marginTop: "20px", justifyContent: "center", display: "flex", "& .MuiPaginationItem-root": { color: "#fff", backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0", }, }, }} />
    </>
  );
}

export default LotesListar;


