import { pool } from "../db.js";

export const getProveedores = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM proveedor");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Hay algun error" + error,
    });
  }
};

export const getProveedor = async (req, res) => {
  const { id_proveedor } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM proveedor WHERE id_proveedor = ?",
      [id_proveedor]
    );

    if (rows.length <= 0)
      return res.status(404).json({
        message: "Proveedor no encontrado",
      });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Hay algun error" + error,
    });
  }
};

export const postProveedor = async (req, res) => {
  const { id_proveedor, nombre, telefono, correo, direccion, avatar } =
    req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO proveedor(id_proveedor,nombre, telefono, correo, direccion, avatar) VALUES (?, ?, ?, ?, ?, ?)",
      [id_proveedor, nombre, telefono, correo, direccion, avatar]
    );

    res.send({
      id_proveedor: rows.insertId,
      nombre,
      telefono,
      correo,
      direccion,
      avatar,
    });
  } catch (error) {
    return res.status(500).json({
      message: "hay algun error" + error,
    });
  }
};

export const updateProveedor = async (req, res) => {
  const { id_proveedor } = req.params;
  const { nombre, telefono, correo, direccion, avatar } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE proveedor SET nombre =  IFNULL(?, nombre), telefono = IFNULL(?, telefono), correo = IFNULL(?, correo), direccion = IFNULL(?, direccion), avatar = IFNULL(?, avatar) WHERE id_proveedor = ?",
      [nombre, telefono, correo, direccion, avatar, id_proveedor]
    );

    console.log(result);

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Proveedor no encontrado",
      });

    const [rows] = await pool.query("SELECT * FROM proveedor WHERE id_proveedor = ?", [
      id_proveedor,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal"+ error,
    });
  }
};

export const deleteProveedor = async (req, res) => {
  const {id_proveedor} = req.params;
  try {
    const [result] = await pool.query("DELETE FROM proveedor WHERE id_proveedor = ?", [
      id_proveedor
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Proveedor no encontrado",
      });

    res.status(200).json({
      message: "Proveedor eliminado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal"+ error,
    });
  }
};
