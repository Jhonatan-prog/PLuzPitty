// src/components/Sidebar.tsx
import React from 'react';
import '@/styles/sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="perfil">
        <img src="/assets/user.png" alt="Perfil" className="avatar" />
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

export default Sidebar;
