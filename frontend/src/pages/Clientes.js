import React, { useState, useEffect } from "react";
import axios from "axios";

function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    obtenerClientes();
  }, []);

  const obtenerClientes = () => {
    axios.get("http://localhost:4000/clientes")
      .then((res) => setClientes(res.data))
      .catch((err) => console.error("Error al obtener clientes:", err));
  };

  const eliminarCliente = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      axios.delete(`http://localhost:4000/clientes/${id}`)
        .then(() => obtenerClientes())
        .catch((err) => console.error("Error al eliminar cliente:", err));
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>📋 Lista de Clientes</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff" }}>
        <thead>
          <tr style={{ backgroundColor: "#e0e0e0", color: "#000" }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Apellido</th>
            <th style={thStyle}>Teléfono</th>
            <th style={thStyle}>Dirección</th>
            <th style={thStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.Id_cliente} style={rowStyle}>
              <td style={tdStyle}>{cliente.Id_cliente}</td>
              <td style={tdStyle}>{cliente.Nombre_cliente}</td>
              <td style={tdStyle}>{cliente.Apellido_cliente}</td>
              <td style={tdStyle}>{cliente.Telefono_cliente}</td>
              <td style={tdStyle}>{cliente.Direccion_cliente}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => eliminarCliente(cliente.Id_cliente)}
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
}

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

export default Clientes;
