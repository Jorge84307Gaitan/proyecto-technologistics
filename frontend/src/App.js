import React, { useState } from 'react';
import './App.css';
import Rutas from './pages/Rutas';
import Transportistas from './pages/Transportistas';
import Pedidos from './pages/Pedidos';
import Clientes from './pages/Clientes';
import Productos from './pages/Productos'; 

function App() {
  const [vistaActual, setVistaActual] = useState('rutas');

  return (
    <div className="container">
      <h1>🌐 TechLogistics - App de rutas</h1>

      <div className="menu-buttons">
        <button onClick={() => setVistaActual('rutas')}>Rutas</button>
        <button onClick={() => setVistaActual('transportistas')}>Transportistas</button>
        <button onClick={() => setVistaActual('pedidos')}>Pedidos</button>
        <button onClick={() => setVistaActual('clientes')}>Clientes</button>
        <button onClick={() => setVistaActual('productos')}>Productos</button>
      </div>

      
      {vistaActual === 'rutas' && <Rutas />}
      {vistaActual === 'transportistas' && <Transportistas />}
      {vistaActual === 'pedidos' && <Pedidos />}
      {vistaActual === 'clientes' && <Clientes />}
      {vistaActual === 'productos' && <Productos />}
    </div>
  );
}

export default App;
