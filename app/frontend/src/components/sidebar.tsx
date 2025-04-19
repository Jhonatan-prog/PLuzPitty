import { useState } from "react";
//import { tailwindStyles } from "@/styles/tailwindStyles";
import perfil from "../assets/perfil.png";
import productos from "../assets/productos.png";
import inventario from "../assets/inventario.png";
import proveedores from "../assets/proveedores.png";
import estadisticas from "../assets/estadisticas.png";
import domicilios from "../assets/domicilios.png";
import devoluciones from "../assets/devoluciones.png";
import cerrarSesion from "../assets/cerrarSesion.png";

const menuItems = [
  { label: "Productos", icon: productos },
  { label: "Inventario", icon: inventario },
  { label: "Proveedores", icon: proveedores },
  { label: "Estadísticas", icon: estadisticas },
  { label: "Domicilios", icon: domicilios },
  { label: "Devoluciones", icon: devoluciones },
  { label: "Cerrar sesión", icon: cerrarSesion },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-[#e5dff3] h-screen p-4 border-r-2 border-purple-700 ${isOpen ? "w-64" : "w-18"} fixed top-0 left-0 z-60 transition-all duration-300 relative`}>
      <div className="flex items-center justify-between mb-6 pb-2">
        {isOpen && (
          <div className="flex items-center gap-2">
            <img src={perfil} alt="Perfil" className="w-25 h-25 rounded-full" />
            <div>
              <p className="text-xs text-gray-500">Perfil</p>
              <p className="font-bold text-purple-800 text-sm">Yuliana Andrea</p>
              <p className="text-xs">Administradora</p>
            </div>
          </div>
        )}
        <button onClick={() => setIsOpen(!isOpen)} className="text-xs p-1 ml-auto">
          {isOpen ? "«" : "»"}
        </button>
      </div>

      <ul className="flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-sm cursor-pointer hover:text-purple-700"
          >
            <img src={item.icon} alt={item.label} className="w-6 h-6" />
            {isOpen && <span>{item.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
