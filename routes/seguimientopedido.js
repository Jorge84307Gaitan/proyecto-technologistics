const express = require("express");
const router = express.Router();
const db = require("../config/db");


router.get("/", (req, res) => {
    db.query("SELECT * FROM seguimientopedido", (err, results) => {
        if (err) {
            console.error("Error al obtener seguimientos:", err);
            res.status(500).json({ error: "Error al obtener seguimientos" });
        } else {
            res.json(results);
        }
    });
});


router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM seguimientopedido WHERE id_seguimiento = ?", [id], (err, result) => {
        if (err) {
            console.error("Error al obtener seguimiento:", err);
            res.status(500).json({ error: "Error al obtener seguimiento" });
        } else if (result.length === 0) {
            res.status(404).json({ error: "Seguimiento no encontrado" });
        } else {
            res.json(result[0]);
        }
    });
});


router.post("/", (req, res) => {
    const { id_pedido, estado, fecha_actualizacion } = req.body;
    db.query("INSERT INTO seguimientopedido (id_pedido, estado, fecha_actualizacion) VALUES (?, ?, ?)",
        [id_pedido, estado, fecha_actualizacion], (err, result) => {
            if (err) {
                console.error("Error al agregar seguimiento:", err);
                res.status(500).json({ error: "Error al agregar seguimiento" });
            } else {
                res.json({ mensaje: "Seguimiento agregado correctamente", id: result.insertId });
            }
        });
});


router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { estado, fecha_actualizacion } = req.body;
    db.query("UPDATE seguimientopedido SET estado = ?, fecha_actualizacion = ? WHERE id_seguimiento = ?",
        [estado, fecha_actualizacion, id], (err, result) => {
            if (err) {
                console.error("Error al actualizar seguimiento:", err);
                res.status(500).json({ error: "Error al actualizar seguimiento" });
            } else {
                res.json({ mensaje: "Seguimiento actualizado correctamente" });
            }
        });
});


router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM seguimientopedido WHERE id_seguimiento = ?", [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar seguimiento:", err);
            res.status(500).json({ error: "Error al eliminar seguimiento" });
        } else {
            res.json({ mensaje: "Seguimiento eliminado correctamente" });
        }
    });
});

module.exports = router;
