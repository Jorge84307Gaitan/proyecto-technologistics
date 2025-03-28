const express = require("express");
const router = express.Router();
const db = require("../config/db");


router.get("/", (req, res) => {
    db.query("SELECT * FROM transportista", (err, results) => {
        if (err) {
            console.error("Error al obtener transportistas:", err);
            res.status(500).json({ error: "Error al obtener transportistas" });
        } else {
            res.json(results);
        }
    });
});


router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM transportista WHERE Id_transportista = ?", [id], (err, result) => {
        if (err) {
            console.error("Error al obtener transportista:", err);
            res.status(500).json({ error: "Error al obtener transportista" });
        } else if (result.length === 0) {
            res.status(404).json({ error: "Transportista no encontrado" });
        } else {
            res.json(result[0]);
        }
    });
});


router.post("/", (req, res) => {
    const { Nombre_transportista, Apellido_transportista, Telefono_transportista } = req.body;

    db.query(
        "INSERT INTO transportista (Nombre_transportista, Apellido_transportista, Telefono_transportista) VALUES (?, ?, ?)",
        [Nombre_transportista, Apellido_transportista, Telefono_transportista],
        (err, result) => {
            if (err) {
                console.error("Error al agregar transportista:", err);
                res.status(500).json({ error: "Error al agregar transportista" });
            } else {
                res.json({ mensaje: "Transportista agregado correctamente", id: result.insertId });
            }
        }
    );
});


router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { Nombre_transportista, Apellido_transportista, Telefono_transportista } = req.body;

    db.query(
        "UPDATE transportista SET Nombre_transportista = ?, Apellido_transportista = ?, Telefono_transportista = ? WHERE Id_transportista = ?",
        [Nombre_transportista, Apellido_transportista, Telefono_transportista, id],
        (err, result) => {
            if (err) {
                console.error("Error al actualizar transportista:", err);
                res.status(500).json({ error: "Error al actualizar transportista" });
            } else {
                res.json({ mensaje: "Transportista actualizado correctamente" });
            }
        }
    );
});


router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM transportista WHERE Id_transportista = ?", [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar transportista:", err);
            res.status(500).json({ error: "Error al eliminar transportista" });
        } else {
            res.json({ mensaje: "Transportista eliminado correctamente" });
        }
    });
});

module.exports = router;
