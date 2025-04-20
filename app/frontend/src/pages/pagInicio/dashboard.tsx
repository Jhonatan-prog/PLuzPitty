import Sidebar from "../../components/pagInicio/sidebar";
import Header from "../../components/pagInicio/header";
import ProductCard from "../../components/pagInicio/productoCard";
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

const products = [//Lista de productos que vamos a mostrar
  { imgSrc: lonchera, name: "Lonchera", price: "30.000" },
  { imgSrc: cuaderno, name: "Cuaderno cuadriculado", price: "20.000" },
  { imgSrc: lienzo, name: "Kit de pintura", price: "50.000" },
  { imgSrc: cartuchera, name: "Estuche colores", price: "25.000" },
  { imgSrc: BoligrafoKiut, name: "Boligrafos Kiut Morados X10 Und", price: "17.000" },
  { imgSrc: BoligrafoNorma, name: "Boligrafos Norma Negro X12", price: "15.000" },
  { imgSrc: PlaneadorSem, name: "Planeador Semanal Kiut 2025 ", price: "20.000" },
  { imgSrc: Cuaderno7M, name: "Cuaderno argollado tapa dura grande multimaterias 7M cuadriculado Jean Book tela real - Azul sky", price: "63.000" },
  { imgSrc: Block, name: "Block oficio línea corriente Jean Book - Denim pines cheer", price: "6.732" },
  { imgSrc: MarcadoBorr, name: "Marcadores Borrables Norma X10 und Negro", price: "25.000" },
  { imgSrc: FolderArgoll, name: "Folder argollado Pvc Academico Negro Ondas", price: "18.000" },
  { imgSrc: ColoresGig, name: "Caja de Colores Norma Gigantes Triangulares x 12 Und + Sacapunta", price: "32.000" }
];

export default function Dashboard() {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-6 overflow-auto">
        <Header />
        {/* Título */}
        <h1 className="text-3xl font-semibold text-purple-400 text-center mt-23">
          Productos
        </h1>
        {/*Contenedor de productos */}
        {/* Aquí vamos a colocar las tarjetas de productos */}
        <div className="flex justify-center mt-10">
        {/* Grid o cuadricula para organizar las tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {/* Recorremos cada producto de la lista y mostramos una tarjeta */} 
        {products.map((product, i) => (
          // Creamos una tarjeta (ProductCard) para cada producto
          // Usamos {...product} para pasar todos los datos como props
          <ProductCard key={i} {...product} />
        ))}
        </div>
        </div>
      </main>
    </div>
  );
}