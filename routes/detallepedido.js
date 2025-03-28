const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
    db.query("SELECT * FROM detallepedido", (err, results) => {
        if (err) {
            console.error("Error al obtener detalles de los pedidos:", err);
            res.status(500).json({ error: "Error al obtener detalles de los pedidos" });
        } else {
            res.json(results);
        }
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM detallepedido WHERE Id_detallepedido = ?", [id], (err, results) => {
        if (err) {
            console.error("Error al obtener detalle de pedido:", err);
            res.status(500).json({ error: "Error al obtener detalle de pedido" });
        } else {
            res.json(results[0] || { mensaje: "Detalle de pedido no encontrado" });
        }
    });
});


router.post("/", (req, res) => {
    const { Id_pedido, Id_producto, Cantidad, Precio_unitario } = req.body;

    if (!Id_pedido || !Id_producto || !Cantidad || !Precio_unitario) {
        return res.status(400).json({ error: "Todos los campos son necesarios" });
    }

    db.query(
        "INSERT INTO detallepedido (Id_pedido, Id_producto, Cantidad, Precio_unidad) VALUES (?, ?, ?, ?)",
        [Id_pedido, Id_producto, Cantidad, Precio_unitario],
        (err, result) => {
            if (err) {
                console.error("Error al crear detalle de pedido:", err);
                return res.status(500).json({ error: "Error al crear detalle de pedido" });
            }
            res.json({ mensaje: "Detalle de pedido creado correctamente", id: result.insertId });
        }
    );
});


router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { Id_pedido, Id_producto, Cantidad, Precio_unitario } = req.body;
    db.query("UPDATE detallepedido SET Id_pedido = ?, Id_producto = ?, Cantidad = ?, Precio_unitario = ? WHERE Id_detallepedido = ?", 
    [Id_pedido, Id_producto, Cantidad, Precio_unitario, id], 
    (err, result) => {
        if (err) {
            console.error("Error al actualizar detalle de pedido:", err);
            res.status(500).json({ error: "Error al actualizar detalle de pedido" });
        } else {
            res.json({ mensaje: "Detalle de pedido actualizado correctamente" });
        }
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM detallepedido WHERE Id_detallepedido = ?", [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar detalle de pedido:", err);
            res.status(500).json({ error: "Error al eliminar detalle de pedido" });
        } else {
            res.json({ mensaje: "Detalle de pedido eliminado correctamente" });
        }
    });
});

module.exports = router;
