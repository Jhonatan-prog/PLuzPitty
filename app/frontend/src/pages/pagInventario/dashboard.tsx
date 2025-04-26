import Sidebar from "../../components/pagInicio/sidebar"; 
import Header from "../../components/pagInicio/header";
import InventarioCard from "../../components/pagInventario/InventarioCard";
import lonchera from "../../assets/lonchera.png";
import cuaderno from "../../assets/cuaderno.png";
import lienzo from "../../assets/lienzo.png";
import cartuchera from "../../assets/cartuchera.png";
import BoligrafoKiut from "../../assets/BoligrafosKiut.jpeg";
import BoligrafoNorma from "../../assets/BoligrafoGelNegro.jpeg";
import PlaneadorSem from "../../assets/PlaneadorSemanal.jpeg";
import Cuaderno7M from "../../assets/Cuaderno7M.jpeg";
import Block from "../../assets/Block.jpeg";
import MarcadoBorr from "../../assets/MarcadoresBorrables.jpeg";
import FolderArgoll from "../../assets/FolderArgollado.jpeg";
import ColoresGig from "../../assets/ColoresJumbo.jpeg";
import { FaPlus } from "react-icons/fa";

// Lista de productos que vamos a mostrar
const products: InventoryCardProps[] = [
  { imgSrc: lonchera, name: "Lonchera", description: "Lonchera térmica infantil con 3 compartimentos", stock: 15 },
  { imgSrc: cuaderno, name: "Cuaderno cuadriculado", description: "Cuaderno cosido de 100 hojas cuadriculado", stock: 25 },
  { imgSrc: lienzo, name: "Kit de pintura", description: "Kit completo de pintura para principiantes", stock: 12 },
  { imgSrc: cartuchera, name: "Estuche colores", description: "Estuche de colores surtidos para dibujar", stock: 20 },
  { imgSrc: BoligrafoKiut, name: "Bolígrafos Kiut Morados", description: "Bolígrafos Kiut Morados X10 unidades", stock: 30 },
  { imgSrc: BoligrafoNorma, name: "Bolígrafos Norma Negro", description: "Bolígrafos Norma Negro X12 unidades", stock: 28 },
  { imgSrc: PlaneadorSem, name: "Planeador Semanal", description: "Planeador Semanal Kiut 2025", stock: 18 },
  { imgSrc: Cuaderno7M, name: "Cuaderno 7M", description: "Cuaderno argollado tapa dura 7 materias", stock: 14 },
  { imgSrc: Block, name: "Block Oficio", description: "Block oficio línea corriente Jean Book", stock: 40 },
  { imgSrc: MarcadoBorr, name: "Marcadores Borrables", description: "Marcadores Borrables Norma X10 Negro", stock: 22 },
  { imgSrc: FolderArgoll, name: "Folder Argollado", description: "Folder argollado PVC Académico Negro", stock: 15 },
  { imgSrc: ColoresGig, name: "Caja de Colores Gigantes", description: "Colores Norma Gigantes Triangulares + Sacapunta", stock: 25 },
];

export default function Dashboard() {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-6 overflow-auto">
        <Header />
        {/* Título */}
        <h1 className="text-3xl font-semibold text-purple-400 text-center mt-23">
          Inventario
        </h1>
        
        {/* Contenedor de productos */}
        <div className="flex justify-center mt-10">
          {/* Grid para organizar las tarjetas */}
          <div className="flex flex-col gap-6 mt-8">
            {/* Recorremos cada producto */}
            {products.map((product, i) => (
              <InventarioCard key={i} {...product} />
            ))}
          </div>
        </div>

        {/* Botón flotante de agregar */}
        <button className="fixed bottom-8 right-8 bg-purple-400 hover:bg-purple-500 text-purple p-4 rounded-full shadow-lg">
            <FaPlus size={24} />
        </button>
      </main>
    </div>
  );
}
