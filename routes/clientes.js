const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Obtener todos los clientes
router.get("/", (req, res) => {
    db.query("SELECT * FROM clientes", (err, results) => {
        if (err) {
            console.error("Error al obtener clientes:", err);
            res.status(500).json({ error: "Error al obtener clientes" });
        } else {
            res.json(results);
        }
    });
});

// Agregar un cliente
router.post("/", (req, res) => {
    const { Nombre_cliente, Apellido_cliente, Direccion_cliente, Telefono_cliente, Email_cliente } = req.body;
    
    if (!Nombre_cliente || !Apellido_cliente || !Direccion_cliente || !Telefono_cliente || !Email_cliente) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const sql = "INSERT INTO clientes (Nombre_cliente, Apellido_cliente, Direccion_cliente, Telefono_cliente, Email_cliente) VALUES (?, ?, ?, ?, ?)";
    const values = [Nombre_cliente, Apellido_cliente, Direccion_cliente, Telefono_cliente, Email_cliente];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error al agregar cliente:", err);
            return res.status(500).json({ error: "Error al agregar cliente" });
        }
        res.json({ mensaje: "Cliente agregado correctamente", id: result.insertId });
    });
});

// Actualizar un cliente
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { Nombre_cliente, Apellido_cliente, Direccion_cliente, Telefono_cliente, Email_cliente } = req.body;

    if (!Nombre_cliente || !Apellido_cliente || !Direccion_cliente || !Telefono_cliente || !Email_cliente) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const sql = "UPDATE clientes SET Nombre_cliente = ?, Apellido_cliente = ?, Direccion_cliente = ?, Telefono_cliente = ?, Email_cliente = ? WHERE Id_cliente = ?";
    const values = [Nombre_cliente, Apellido_cliente, Direccion_cliente, Telefono_cliente, Email_cliente, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error al actualizar cliente:", err);
            return res.status(500).json({ error: "Error al actualizar cliente" });
        }
        res.json({ mensaje: "Cliente actualizado correctamente" });
    });
});

// Eliminar un cliente
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM clientes WHERE Id_cliente = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar cliente:", err);
            return res.status(500).json({ error: "Error al eliminar cliente" });
        }
        res.json({ mensaje: "Cliente eliminado correctamente" });
    });
});




// Exportar el router
module.exports = router;
