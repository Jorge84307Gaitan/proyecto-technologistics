const express = require("express");
const router = express.Router();
const db = require("../config/db"); 


router.get("/", (req, res) => {
  db.query("SELECT * FROM productos", (err, results) => {
    if (err) {
      console.error("Error al obtener productos:", err);
      return res.status(500).json({ error: "Error al obtener productos" });
    }
    res.json(results);
  });
});


router.post("/", (req, res) => {
  const { Nombre_producto, Descripcion, Precio, Stock } = req.body;

  if (!Nombre_producto || !Descripcion || Precio == null || Stock == null) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const sql = "INSERT INTO productos (Nombre_producto, Descripcion, Precio, Stock) VALUES (?, ?, ?, ?)";
  const values = [Nombre_producto, Descripcion, Precio, Stock];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al agregar producto:", err);
      return res.status(500).json({ error: "Error al agregar producto" });
    }

    res.status(201).json({
      mensaje: "Producto agregado correctamente",
      id_producto: result.insertId,
    });
  });
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM productos WHERE Id_producto = ?", [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar producto:", err);
      return res.status(500).json({ error: "Error al eliminar producto" });
    }

    res.json({ mensaje: "Producto eliminado correctamente" });
  });
});

module.exports = router;
