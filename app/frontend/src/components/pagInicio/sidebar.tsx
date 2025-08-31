import { useState } from "react";
import { Link } from "react-router-dom"; 
import perfil from "../../assets/perfil.png";
import productos from "../../assets/productos.png";
import inventario from "../../assets/inventario.png";
import proveedores from "../../assets/proveedores.png";
import estadisticas from "../../assets/estadisticas.png";
import domicilios from "../../assets/domicilios.png";
import devoluciones from "../../assets/devoluciones.png";
import cerrarSesion from "../../assets/cerrarSesion.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Auth } from "../../api/auth";

const menuItems = [// Estas son las opciones que tenemos en la barra lateral
  { label: "Productos", icon: productos, path: "/" },
  { label: "Inventario", icon: inventario, path: "/inventario" },
  { label: "Proveedores", icon: proveedores, path: "/Proveedor" },
  { label: "Estadísticas", icon: estadisticas, path: "/estadisticas"},
  { label: "Domicilios", icon: domicilios, path: "/domicilios" },
  { label: "Devoluciones", icon: devoluciones, path: "/devoluciones" },
  { label: "Cerrar sesión", icon: cerrarSesion, path: "/login" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);//Estado de inicio de la barra lateral cuando abrimos la página, si está true, aparece abierta, false, aparece cerrada

  const auth = new Auth(undefined);
 
  return (
    <div className={`fixed bg-[#e5dff3] h-full p-4 border-r-2 border-purple-700 ${isOpen ? "w-64" : "w-18"} top-0 left-0 z-60 transition-all duration-300`}>
      {/* Solo mostramos esta parte si la barra está abierta */}
      <div className={"flex w-[100px] items-center gap-2 mt-1 transition-all duration-300 " + (isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}>
        <img src={perfil} alt="Perfil" className="w-25 h-28 rounded-full z-20" />
        <div className={"relative transition-all duration-300 " + (isOpen ? "right-0" : "right-20")}>
          <p className="text-xm text-gray-500">Perfil</p>
          <p className="font-bold text-purple-800 text-sm">{}</p>
          <p className="text-xm">{}</p>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 right-2 bg-transparent text-purple-700 text-xl shadow-lg shadow-purple-400/60 p-2 z-50 hover:bg-purple-200 transition cursor-pointer"
      >
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      <ul className=" absolute flex flex-col  gap-2 justify-center">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path} onClick={() => {if (item.path.toLowerCase().trim() === "/login") auth.logout()}}>
            <li className="flex items-center text-sm text-black-400 cursor-pointer hover:text-purple-700 py-3">
              <img src={item.icon} alt={item.label} className="w-8 h-8 justify-center" />
              {/* Solo mostramos el texto del ítem si la barra está abierta */}
              <span className={"w-[120px] ml-2 transition-all duration-300 " + (isOpen ? "opacity-100" : "opacity-0 pointer-events-none") }>{item.label}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
