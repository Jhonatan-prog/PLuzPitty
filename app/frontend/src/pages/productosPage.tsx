import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui(userInterface)/card';
import '../styles/productos.css';
import '../styles/sidebar.css';
import perfil from '../assets/perfil.png';
import cartuchera from '../assets/cartuchera.png';
import lonchera from '../assets/lonchera.png';
import cuaderno from '../assets/cuaderno.png';
import lienzo from '../assets/lienzo.png';

const productos = [
  {
    nombre: 'Lonchera',
    precio: '30.000',
    imagen: lonchera,
  },
  {
    nombre: 'Cuaderno cuadriculado',
    precio: '20.000',
    imagen: cuaderno,
  },
  {
    nombre: 'Kit de pintura',
    precio: '50.000',
    imagen: lienzo,
  },
  {
    nombre: 'Estuche colores',
    precio: '25.000',
    imagen: cartuchera,
  },
];

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="perfil">
        <img src={perfil} alt="Perfil" className="avatar" />
        <div>
          <p className="nombre">Yuliana Andrea</p>
          <p className="rol">Administradora</p>
        </div>
      </div>
      <ul className="menu">
        <li>📦 Productos</li>
        <li>📋 Inventario</li>
        <li>🧑‍💼 Proveedores</li>
        <li>📊 Estadísticas</li>
        <li>🚚 Domicilios</li>
        <li>🔄 Devoluciones</li>
        <li>🔓 Cerrar sesión</li>
      </ul>
    </div>
  );
};

const ProductosPage: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="layout">
      <Sidebar />
      <div className="productos-container">
        <h1 className="titulo">Productos</h1>

        <input
          type="text"
          placeholder="Buscar producto"
          className="input-busqueda"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <div className="grid-productos">
          {productosFiltrados.map((producto, index) => (
            <Card key={index} className="producto-card">
              <CardContent>
                <img src={producto.imagen} alt={producto.nombre} className="imagen-producto" />
                <h2 className="nombre-producto">{producto.nombre}</h2>
                <p className="precio-producto">${producto.precio} COP</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductosPage;

