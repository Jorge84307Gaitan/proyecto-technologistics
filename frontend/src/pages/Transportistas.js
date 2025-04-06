import React, { useEffect, useState } from "react";
import axios from "axios";

const Transportistas = () => {
  const [transportistas, setTransportistas] = useState([]);
  const [nuevoTransportista, setNuevoTransportista] = useState({
    Nombre_transportista: "",
    Apellido_transportista: "",
    Telefono_transportista: "",
  });

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const obtenerTransportistas = async () => {
    try {
      const res = await axios.get("http://localhost:4000/transportista");
      setTransportistas(res.data);
    } catch (err) {
      console.error("Error al obtener transportistas:", err);
    }
  };

  const agregarTransportista = async () => {
    try {
      await axios.post("http://localhost:4000/transportista", nuevoTransportista);
      setNuevoTransportista({
        Nombre_transportista: "",
        Apellido_transportista: "",
        Telefono_transportista: "",
      });
      obtenerTransportistas();
    } catch (err) {
      console.error("Error al agregar transportista:", err);
    }
  };

  const eliminarTransportista = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/transportista/${id}`);
      obtenerTransportistas();
    } catch (err) {
      console.error("Error al eliminar transportista:", err);
    }
  };

  const editarTransportista = (transportista) => {
    setModoEdicion(true);
    setIdEditar(transportista.Id_transportista);
    setNuevoTransportista({
      Nombre_transportista: transportista.Nombre_transportista,
      Apellido_transportista: transportista.Apellido_transportista,
      Telefono_transportista: transportista.Telefono_transportista,
    });
  };

  const guardarEdicion = async () => {
    try {
      await axios.put(`http://localhost:4000/transportista/${idEditar}`, nuevoTransportista);
      setNuevoTransportista({
        Nombre_transportista: "",
        Apellido_transportista: "",
        Telefono_transportista: "",
      });
      setModoEdicion(false);
      setIdEditar(null);
      obtenerTransportistas();
    } catch (err) {
      console.error("Error al editar transportista:", err);
    }
  };

  useEffect(() => {
    obtenerTransportistas();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Transportistas</h2>

      <div className="mb-4 space-x-2">
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoTransportista.Nombre_transportista}
          onChange={(e) =>
            setNuevoTransportista({ ...nuevoTransportista, Nombre_transportista: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Apellido"
          value={nuevoTransportista.Apellido_transportista}
          onChange={(e) =>
            setNuevoTransportista({ ...nuevoTransportista, Apellido_transportista: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={nuevoTransportista.Telefono_transportista}
          onChange={(e) =>
            setNuevoTransportista({ ...nuevoTransportista, Telefono_transportista: e.target.value })
          }
          className="border p-2 rounded"
        />
        {modoEdicion ? (
          <button onClick={guardarEdicion} className="bg-green-500 text-white px-4 py-2 rounded">
            Guardar
          </button>
        ) : (
          <button onClick={agregarTransportista} className="bg-blue-500 text-white px-4 py-2 rounded">
            Agregar
          </button>
        )}
      </div>

      <table className="w-full border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Apellido</th>
            <th className="p-2 border">Teléfono</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transportistas.map((t) => (
            <tr key={t.Id_transportista} className="hover:bg-gray-50">
              <td className="p-2 border">{t.Nombre_transportista}</td>
              <td className="p-2 border">{t.Apellido_transportista}</td>
              <td className="p-2 border">{t.Telefono_transportista}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => editarTransportista(t)}
                  className="bg-yellow-400 px-3 py-1 rounded text-white"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarTransportista(t.Id_transportista)}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transportistas;


