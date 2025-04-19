import Sidebar from "../components/sidebar";
import Header from "../components/header";
import ProductCard from "../components/productoCard";
import lonchera from "../assets/lonchera.png";
import cuaderno from "../assets/cuaderno.png";
import lienzo from "../assets/lienzo.png";
import cartuchera from "../assets/cartuchera.png"

const products = [
  { imgSrc: lonchera, name: "Lonchera", price: "30.000" },
  { imgSrc: cuaderno, name: "Cuaderno cuadriculado", price: "20.000" },
  { imgSrc: lienzo, name: "Kit de pintura", price: "50.000" },
  { imgSrc: cartuchera, name: "Estuche colores", price: "25.000" },
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
        <div className="flex justify-center mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {products.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
        </div>
        </div>
      </main>
    </div>
  );
}