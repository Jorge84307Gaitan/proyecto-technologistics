const express = require("express");
const router = express.Router();
const db = require("../config/db");


router.get("/", (req, res) => {
    db.query("SELECT * FROM ruta", (err, results) => {
        if (err) {
            console.error("Error al obtener rutas:", err);
            res.status(500).json({ error: "Error al obtener rutas" });
        } else {
            res.json(results);
        }
    });
});


router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM ruta WHERE Id_ruta = ?", [id], (err, results) => {
        if (err) {
            console.error("Error al obtener ruta:", err);
            res.status(500).json({ error: "Error al obtener ruta" });
        } else {
            res.json(results[0] || { mensaje: "Ruta no encontrada" });
        }
    });
});


router.post('/', (req, res) => {
    const { Origen, Destino, Distancia, Tiempo_estimado } = req.body;
  
    const query = 'INSERT INTO ruta (Origen, Destino, Distancia, Tiempo_estimado) VALUES (?, ?, ?, ?)';
    db.query(query, [Origen, Destino, Distancia, Tiempo_estimado], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al crear ruta' });
      }
      res.status(201).json({ message: 'Ruta creada con éxito', id: result.insertId });
    });
});


router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { Origen, Destino, Distancia, Tiempo_estimado } = req.body;
    db.query("UPDATE ruta SET Origen = ?, Destino = ?, Distancia = ?, Tiempo_estimado = ? WHERE Id_ruta = ?", 
    [Origen, Destino, Distancia, Tiempo_estimado, id], 
    (err, result) => {
        if (err) {
            console.error("Error al actualizar ruta:", err);
            res.status(500).json({ error: "Error al actualizar ruta" });
        } else {
            res.json({ mensaje: "Ruta actualizada correctamente" });
        }
    });
});


router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM ruta WHERE Id_ruta = ?", [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar ruta:", err);
            res.status(500).json({ error: "Error al eliminar ruta" });
        } else {
            res.json({ mensaje: "Ruta eliminada correctamente" });
        }
    });
});

module.exports = router;
