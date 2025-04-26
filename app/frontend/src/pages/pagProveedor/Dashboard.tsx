
import Sidebar from "../../components/pagInicio/sidebar"; 
import Header from "../../components/pagInicio/header";
import { FaPlus } from "react-icons/fa";
import Rapeluches from "../../assets/Rapeluches.jpg"
import creamHela from "../../assets/CreamHelado.png"
import Norma from "../../assets/Norma.png"
import ProveedorCard from "../../components/pagProveedor/ProveedorCard";

// Lista de productos que vamos a mostrar
const proveedor: ProveedorProps[] = [
  { imgSrc: Rapeluches, name: "Rapeluches", Tel: "319 780 6787", description: "Empresa fabricante de peluches" },
  { imgSrc: creamHela, name: "CreamHelado", Tel: "319 780 6787", description: "Empresa fabricante y comercializadora de helados" },
  { imgSrc: Norma, name: "Norma", Tel: "319 780 6787", description: "Empresa fabricante de utiles escolares" },
];

export default function Dashboard() {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-6 overflow-auto">
        <Header />
        {/* Título */}
        <h1 className="text-3xl font-semibold text-purple-400 text-center mt-23">
          Proveedores
        </h1>
        
        {/* Contenedor de productos */}
        <div className="flex justify-center mt-10">
          {/* Grid para organizar las tarjetas */}
          <div className="flex flex-col gap-6 mt-8">
            {/* Recorremos cada proveedor */}
            {proveedor.map((proveedor, i) => (
              <ProveedorCard key={i} {...proveedor} />
            ))}
          </div>
        </div>

        {/* Botón flotante de agregar */}
        <button className="fixed bottom-8 right-8 bg-cyan-300 hover:bg-cyan-500 text-cyan-800 p-4 rounded-full shadow-lg">
            <FaPlus size={24} />
        </button>
      </main>
    </div>
  );
}
