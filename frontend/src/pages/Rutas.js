import React, { useEffect, useState } from "react";
import axios from "axios";

const Rutas = () => {
  const [rutas, setRutas] = useState([]);
  const [nuevaRuta, setNuevaRuta] = useState({
    Origen: "",
    Destino: "",
    Distancia: "",
    Tiempo_estimado: ""
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    obtenerRutas();
  }, []);

  const obtenerRutas = () => {
    axios.get("http://localhost:4000/rutas")
      .then((response) => setRutas(response.data))
      .catch((error) => console.error("Error al obtener rutas:", error));
  };

  const handleChange = (e) => {
    setNuevaRuta({ ...nuevaRuta, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modoEdicion) {
      axios.put(`http://localhost:4000/rutas/${idEditando}`, nuevaRuta)
        .then(() => {
          alert("✅ Ruta actualizada correctamente");
          cancelarEdicion();
          obtenerRutas();
        })
        .catch((error) => {
          console.error("Error al actualizar ruta:", error);
          alert("❌ Error al actualizar ruta");
        });
    } else {
      axios.post("http://localhost:4000/rutas", nuevaRuta)
        .then(() => {
          alert("✅ Ruta agregada correctamente");
          setNuevaRuta({ Origen: "", Destino: "", Distancia: "", Tiempo_estimado: "" });
          obtenerRutas();
        })
        .catch((error) => {
          console.error("Error al agregar ruta:", error);
          alert("❌ Error al agregar ruta");
        });
    }
  };

  const eliminarRuta = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta ruta?")) {
      axios.delete(`http://localhost:4000/rutas/${id}`)
        .then(() => {
          alert("✅ Ruta eliminada correctamente");
          obtenerRutas();
        })
        .catch((error) => {
          console.error("Error al eliminar ruta:", error);
          alert("❌ Error al eliminar ruta");
        });
    }
  };

  const editarRuta = (ruta) => {
    setModoEdicion(true);
    setIdEditando(ruta.Id_ruta);
    setNuevaRuta({
      Origen: ruta.Origen,
      Destino: ruta.Destino,
      Distancia: ruta.Distancia,
      Tiempo_estimado: ruta.Tiempo_estimado
    });
  };

  const cancelarEdicion = () => {
    setModoEdicion(false);
    setIdEditando(null);
    setNuevaRuta({ Origen: "", Destino: "", Distancia: "", Tiempo_estimado: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Lista de Rutas</h2>

      <table border="1" cellPadding="10" style={{ marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Distancia (km)</th>
            <th>Tiempo Estimado (min)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rutas.map((ruta) => (
            <tr key={ruta.Id_ruta}>
              <td>{ruta.Id_ruta}</td>
              <td>{ruta.Origen}</td>
              <td>{ruta.Destino}</td>
              <td>{ruta.Distancia}</td>
              <td>{ruta.Tiempo_estimado}</td>
              <td>
                <button onClick={() => editarRuta(ruta)}>✏️ Editar</button>
                <button
                  onClick={() => eliminarRuta(ruta.Id_ruta)}
                  style={{ backgroundColor: "red", color: "white", marginLeft: "5px" }}
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{modoEdicion ? "✏️ Editar Ruta" : "➕ Agregar Nueva Ruta"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Origen"
          placeholder="Origen"
          value={nuevaRuta.Origen}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Destino"
          placeholder="Destino"
          value={nuevaRuta.Destino}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="Distancia"
          placeholder="Distancia (km)"
          value={nuevaRuta.Distancia}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="Tiempo_estimado"
          placeholder="Tiempo estimado (min)"
          value={nuevaRuta.Tiempo_estimado}
          onChange={handleChange}
          required
        />
        <button type="submit">{modoEdicion ? "Actualizar Ruta" : "Agregar Ruta"}</button>
        {modoEdicion && <button onClick={cancelarEdicion} style={{ marginLeft: "10px" }}>Cancelar</button>}
      </form>
    </div>
  );
};

export default Rutas;
