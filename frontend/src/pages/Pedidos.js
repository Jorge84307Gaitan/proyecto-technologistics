import React, { useState, useEffect } from "react";
import axios from "axios";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    obtenerPedidos();
  }, []);

  const obtenerPedidos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/pedidos");
      setPedidos(res.data);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  };

  const eliminarPedido = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este pedido?")) {
      try {
        await axios.delete(`http://localhost:4000/pedidos/${id}`);
        obtenerPedidos();
      } catch (error) {
        console.error("Error al eliminar pedido:", error);
      }
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>📦 Lista de Pedidos</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff" }}>
        <thead>
          <tr style={{ backgroundColor: "#e0e0e0", color: "#000" }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Cliente</th>
            <th style={thStyle}>Transportista</th>
            <th style={thStyle}>Fecha</th>
            <th style={thStyle}>Estado</th>
            <th style={thStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.Id_pedido} style={rowStyle}>
              <td style={tdStyle}>{pedido.Id_pedido}</td>
              <td style={tdStyle}>{pedido.Id_cliente}</td>
              <td style={tdStyle}>{pedido.Id_transportista}</td>
              <td style={tdStyle}>{pedido.Fecha_pedido}</td>
              <td style={tdStyle}>{pedido.Estado}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => eliminarPedido(pedido.Id_pedido)}
                  style={deleteButtonStyle}
                >
                  Eliminar 🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 🎨 Estilos
const thStyle = {
  padding: "12px",
  border: "1px solid #ccc",
  textAlign: "left",
  fontWeight: "bold"
};

const tdStyle = {
  padding: "12px",
  border: "1px solid #eee",
  color: "#000"
};

const rowStyle = {
  backgroundColor: "#f9f9f9"
};

const deleteButtonStyle = {
  padding: "6px 12px",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Pedidos;
