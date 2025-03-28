const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Obtener todos los productos
router.get("/", (req, res) => {
    db.query("SELECT * FROM productos", (err, results) => {
        if (err) {
            console.error("Error al obtener productos:", err);
            res.status(500).json({ error: "Error al obtener productos" });
        } else {
            res.json(results);
        }
    });
});

// Agregar un nuevo producto
router.post("/", (req, res) => {
    const { nombre_producto, descripcion, precio } = req.body;
    db.query("INSERT INTO productos (nombre_producto, descripcion, precio) VALUES (?, ?, ?)", 
    [nombre_producto, descripcion, precio], 
    (err, result) => {
        if (err) {
            console.error("Error al agregar producto:", err);
            res.status(500).json({ error: "Error al agregar producto" });
        } else {
            res.json({ mensaje: "Producto agregado correctamente", id: result.insertId });
        }
    });
});

// Actualizar un producto por ID
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nombre_producto, descripcion, precio } = req.body;
    db.query("UPDATE productos SET nombre_producto = ?, descripcion = ?, precio = ? WHERE id_producto = ?", 
    [nombre_producto, descripcion, precio, id], 
    (err, result) => {
        if (err) {
            console.error("Error al actualizar producto:", err);
            res.status(500).json({ error: "Error al actualizar producto" });
        } else {
            res.json({ mensaje: "Producto actualizado correctamente" });
        }
    });
});

// Eliminar un producto por ID
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM productos WHERE id_producto = ?", [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar producto:", err);
            res.status(500).json({ error: "Error al eliminar producto" });
        } else {
            res.json({ mensaje: "Producto eliminado correctamente" });
        }
    });
});

// Exportar el router
module.exports = router;
