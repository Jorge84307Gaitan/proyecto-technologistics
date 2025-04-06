import React, { useEffect, useState } from "react";
import axios from "axios";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  const URL = "http://localhost:4000/productos";

  const obtenerProductos = async () => {
    try {
      const res = await axios.get(URL);
      setProductos(res.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const agregarProducto = async (e) => {
    e.preventDefault();
    if (!nombre || !descripcion || !precio || !stock) {
      alert("Completa todos los campos");
      return;
    }

    try {
      await axios.post(URL, {
        Nombre_producto: nombre,
        Descripcion: descripcion,
        Precio: parseFloat(precio),
        Stock: parseInt(stock),
      });

      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");

      obtenerProductos();
      alert("Producto agregado correctamente");
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("Error al agregar producto");
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      obtenerProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Productos</h2>

      <form onSubmit={agregarProducto} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ margin: "5px" }}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{ margin: "5px" }}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          style={{ margin: "5px" }}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={{ margin: "5px" }}
        />
        <button type="submit">Agregar</button>
      </form>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.Id_producto}>
              <td>{prod.Id_producto}</td>
              <td>{prod.Nombre_producto}</td>
              <td>{prod.Descripcion}</td>
              <td>{prod.Precio}</td>
              <td>{prod.Stock}</td>
              <td>
                <button onClick={() => eliminarProducto(prod.Id_producto)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Productos;
