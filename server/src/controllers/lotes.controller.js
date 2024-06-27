import { pool } from "../db.js";

export const lotes = async (req, res) => {
  const { vencimiento, stock, idProveedor, idProducto } = req.body;
  try {
    const [rows] = await pool.query(
      `INSERT INTO lote(vencimiento, stock, id_proveedor, id_producto)VALUES (?, ?, ?, ?)`,
      [vencimiento, stock, idProveedor, idProducto]
    );
    res.send({
      id_lote: rows.insertId,
      vencimiento,
      stock,
      idProveedor,
      idProducto,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal" + error,
    });
  }
};

export const lotesListar = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM lote')
    res.send(rows)
  } catch {
    return res.status(500).json({
      message: "Algo salio mal" + error,
    });
  }
}

export const deleteLote = async (req, res) => {
  const { id_lote } = req.params;
  try {
    await pool.query(`DELETE FROM lote WHERE id_lote = ?`, [id_lote]);
    res.json({ message: "Lote eliminado" });
  } catch (error) {
    res.status(500).json({
      message: "Algo salio mal" + error,
    });
  }
}

export const lotes_vencidos = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT 
        l.id_lote,
        l.vencimiento AS fecha_de_vencimiento,
        p.nombre AS nombre_producto,
        pr.nombre AS nombre_proveedor,
        l.stock
    FROM 
        lote l
    JOIN 
        producto p ON l.id_producto = p.id_producto
    JOIN 
        proveedor pr ON l.id_proveedor = pr.id_proveedor
    WHERE 
        l.vencimiento <= CURDATE()`);
    res.send(rows);
  } catch (error) {
    res.status(500).json({
      message: "Algo salio mal", error,
    });
  }
};
