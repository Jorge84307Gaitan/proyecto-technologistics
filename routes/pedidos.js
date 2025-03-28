const express = require("express");
const router = express.Router();
const db = require("../config/db");


router.get("/", (req, res) => {
    db.query("SELECT * FROM pedidos", (err, results) => {
        if (err) {
            console.error("Error al obtener pedidos:", err);
            res.status(500).json({ error: "Error al obtener pedidos" });
        } else {
            res.json(results);
        }
    });
});


router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM pedidos WHERE Id_pedido = ?", [id], (err, results) => {
        if (err) {
            console.error("Error al obtener pedido:", err);
            res.status(500).json({ error: "Error al obtener pedido" });
        } else {
            res.json(results[0] || { mensaje: "Pedido no encontrado" });
        }
    });
});


router.post("/", (req, res) => {
    const { Id_cliente, Fecha_pedido, Estado_pedido } = req.body;
    db.query("INSERT INTO pedidos (Id_cliente, Fecha_pedido, Estado_pedido) VALUES (?, ?, ?)", 
    [Id_cliente, Fecha_pedido, Estado_pedido], 
    (err, result) => {
        if (err) {
            console.error("Error al crear pedido:", err);
            res.status(500).json({ error: "Error al crear pedido" });
        } else {
            res.json({ mensaje: "Pedido creado correctamente", id: result.insertId });
        }
    });
});


router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { Id_cliente, Fecha_pedido, Estado_pedido } = req.body;
    db.query("UPDATE pedidos SET Id_cliente = ?, Fecha_pedido = ?, Estado_pedido = ? WHERE Id_pedido = ?", 
    [Id_cliente, Fecha_pedido, Estado_pedido, id], 
    (err, result) => {
        if (err) {
            console.error("Error al actualizar pedido:", err);
            res.status(500).json({ error: "Error al actualizar pedido" });
        } else {
            res.json({ mensaje: "Pedido actualizado correctamente" });
        }
    });
});


router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM pedidos WHERE Id_pedido = ?", [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar pedido:", err);
            res.status(500).json({ error: "Error al eliminar pedido" });
        } else {
            res.json({ mensaje: "Pedido eliminado correctamente" });
        }
    });
});

module.exports = router;
