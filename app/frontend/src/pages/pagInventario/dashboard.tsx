import Sidebar from "../../components/pagInicio/sidebar"; 
import Header from "../../components/pagInicio/header";
import InventoryCard from "../../components/pagInventario/InventarioCard";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Request } from "../../api/requests";

export default function Dashboard() {
  //almacena los productos
    const [producto, setProductos] = useState<InventoryCardProps[]>([]);
    const [filteredProductos, setFilteredProductos] = useState<InventoryCardProps[]>([]); //almacena los productos filtrados
    const [error, setError] = useState<string | null>(null);

  //realiza la solicitud al cargar la pagina
  //useEffect para obtener los productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      const request = new Request("http://localhost:5000", {});
      try {
        const response = await request.get("producto/ConsultarTodos");
        console.log('Datos del servidor:', response?.data);
        if (response?.data) {
          setProductos(response.data);
          setFilteredProductos(response.data); // Inicialmente mostramos todos los productos
        } else {
          throw new Error("No se pudieron obtener los datos de los productos");
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchProductos();
  }, []);

  //Maneja la busqueda en tiempo real
  const handleSearch = (query: string) => {
    //el trim() elimina los espacios en blanco al principio y al final de la cadena
    if(query.trim() === "") {// Si la búsqueda está vacía, mostramos todos los productos
      setFilteredProductos(producto); 
    }else {
      // Filtramos los productos que coinciden con la búsqueda
      const filtered = producto.filter((product) =>
        product.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProductos(filtered);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-6">
        <Header onSearch={handleSearch}/>
        {/* Título */}
        <h1 className="text-3xl font-semibold text-purple-400 text-center mt-23">
          Inventario
        </h1>
        
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Contenedor de productos */}
        <div className="flex justify-center mt-10">
          {/* Grid para organizar las tarjetas */}
          <div className="flex flex-col gap-6 mt-8">
            {filteredProductos.length > 0 ?(
            filteredProductos.map((producto, i) => (
              <InventoryCard
                key={i}
                imagen={producto.imagen}
                nombre={producto.nombre}
                descripcion={producto.descripcion}
                stock={producto.stock}
              /> 
            ))
            ) : (
              <p className="text-gray-500 text-center">No se encontraron productos.</p> 
            )}
          </div>
        </div>

        {/* Botón flotante de agregar */}
        <Link to="/Add">
          <button className="fixed bottom-8 right-8 bg-cyan-300 hover:bg-cyan-500 text-cyan-800 p-4 rounded-full shadow-lg">
            <FaPlus size={24} />
          </button>
        </Link>
      </main>
    </div>
  );
}
