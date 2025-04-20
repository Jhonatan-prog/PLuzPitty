import { useState } from "react";
import perfil from "../../assets/perfil.png";
import productos from "../../assets/productos.png";
import inventario from "../../assets/inventario.png";
import proveedores from "../../assets/proveedores.png";
import estadisticas from "../../assets/estadisticas.png";
import domicilios from "../../assets/domicilios.png";
import devoluciones from "../../assets/devoluciones.png";
import cerrarSesion from "../../assets/cerrarSesion.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
 
const menuItems = [// Estas son las opciones que tenemos en la barra lateral
  { label: "Productos", icon: productos },
  { label: "Inventario", icon: inventario },
  { label: "Proveedores", icon: proveedores },
  { label: "Estadísticas", icon: estadisticas },
  { label: "Domicilios", icon: domicilios },
  { label: "Devoluciones", icon: devoluciones },
  { label: "Cerrar sesión", icon: cerrarSesion },
];
 
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);//Estado de inicio de la barra lateral cuando abrimos la página, si está true, aparece abierta, false, aparece cerrada
 
  return (
    <div className={`bg-[#e5dff3] h-screen p-4 border-r-2 border-purple-700 ${isOpen ? "w-64" : "w-18"} fixed top-0 left-0 z-60 transition-all duration-300 relative`}>
      <div className="flex items-center justify-between mb-6 pb-2">
        {/* Solo mostramos esta parte si la barra está abierta */}
        {isOpen && (
          <div className="flex items-center gap-2 mt-5">
            <img src={perfil} alt="Perfil" className="w-25 h-28 rounded-full" />
            <div>
              <p className="text-xm text-gray-500">Perfil</p>
              <p className="font-bold text-purple-800 text-sm">Yuliana Andrea</p>
              <p className="text-xm">Administradora</p>
            </div>
          </div>
        )}
      </div>
 
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-4 right-2 bg-transparent text-purple-700 text-xl shadow-lg shadow-purple-400/60 p-2 z-50 hover:bg-purple-200 transition"
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
 
      <ul className="flex flex-col gap-4 mt-10">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-sm cursor-pointer hover:text-purple-700 py-4"
          >
            <img src={item.icon} alt={item.label} className="w-8 h-8 justify-center" />
            {/* Solo mostramos el texto del ítem si la barra está abierta */}
            {isOpen && <span>{item.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};
 
export default Sidebar;