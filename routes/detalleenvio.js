const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Obtener todos los detalles de envío
router.get("/", (req, res) => {
    db.query("SELECT * FROM detalleenvio", (err, results) => {
        if (err) {
            console.error("Error al obtener detalles de envío:", err);
            res.status(500).json({ error: "Error al obtener detalles de envío" });
        } else {
            res.json(results);
        }
    });
});

// Obtener un detalle de envío por ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM detalleenvio WHERE Id_envio = ?", [id], (err, results) => {
        if (err) {
            console.error("Error al obtener detalle de envío:", err);
            res.status(500).json({ error: "Error al obtener detalle de envío" });
        } else {
            res.json(results[0] || { mensaje: "Detalle de envío no encontrado" });
        }
    });
});

// Crear un nuevo detalle de envío
router.post("/", (req, res) => {
    const { Id_pedido, Id_ruta, Fecha_envio, Estado_envio } = req.body;
    db.query(
        "INSERT INTO detalleenvio (Id_pedido, Id_ruta, Fecha_envio, Estado_envio) VALUES (?, ?, ?, ?)",
        [Id_pedido, Id_ruta, Fecha_envio, Estado_envio],
        (err, result) => {
            if (err) {
                console.error("Error al crear detalle de envío:", err);
                res.status(500).json({ error: "Error al crear detalle de envío" });
            } else {
                res.json({ mensaje: "Detalle de envío creado correctamente", id: result.insertId });
            }
        }
    );
});

// Actualizar un detalle de envío
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { Id_pedido, Id_ruta, Fecha_envio, Estado_envio } = req.body;
    db.query(
        "UPDATE detalleenvio SET Id_pedido = ?, Id_ruta = ?, Fecha_envio = ?, Estado_envio = ? WHERE Id_envio = ?",
        [Id_pedido, Id_ruta, Fecha_envio, Estado_envio, id],
        (err, result) => {
            if (err) {
                console.error("Error al actualizar detalle de envío:", err);
                res.status(500).json({ error: "Error al actualizar detalle de envío" });
            } else {
                res.json({ mensaje: "Detalle de envío actualizado correctamente" });
            }
        }
    );
});

// Eliminar un detalle de envío
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM detalleenvio WHERE Id_envio = ?", [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar detalle de envío:", err);
            res.status(500).json({ error: "Error al eliminar detalle de envío" });
        } else {
            res.json({ mensaje: "Detalle de envío eliminado correctamente" });
        }
    });
});

module.exports = router;
