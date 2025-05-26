
import Sidebar from "../../components/pagInicio/sidebar"; 
import Header from "../../components/pagInicio/header";
import { FaPlus } from "react-icons/fa";
import ProveedorCard from "../../components/pagProveedor/ProveedorCard";
import { Link } from "react-router-dom";
import { Request } from "../../api/requests";
import { useEffect, useState } from "react";

export default function Dashboard() {
  //almacena los proveedores
  const [proveedor, setProveedores] = useState<ProveedorProps[]>([]);
  const [filteredProveedores, setFilteredProveedores] = useState<ProveedorProps[]>([]); //almacena los proveedores filtrados
  const [error, setError] = useState<string | null>(null);

  //realiza la solicitud al cargar la pagina
  //useEffect para obtener los proveedores desde la API
  useEffect(() => {
    const fetchProveedores = async () => {
      const request = new Request("http://localhost:5000", {});
      try {
        const response = await request.get("Proveedor/ConsultarTodos");
        console.log('Datos del servidor:', response?.data);
        if (response?.data) {
          setProveedores(response.data);
          setFilteredProveedores(response.data); // Inicialmente mostramos todos los proveedores
        } else {
          throw new Error("No se pudieron obtener los datos de los proveedores.");
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchProveedores();
  }, []);

  //Maneja la busqueda en tiempo real
  const handleSearch = (query: string) => {
    //el trim() elimina los espacios en blanco al principio y al final de la cadena
    if(query.trim() === "") {// Si la búsqueda está vacía, mostramos todos los proveedores
      setFilteredProveedores(proveedor); 
    }else {
      // Filtramos los proveedores que coinciden con la búsqueda
      const filtered = proveedor.filter((proveedor) =>
        proveedor.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProveedores(filtered);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-6 overflow-auto">
        <Header onSearch={handleSearch}/>
        {/* Título */}
        <h1 className="text-3xl font-semibold text-purple-400 text-center mt-23">
          Proveedores
        </h1>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        
        {/* Contenedor de proveedores */}
        <div className="flex justify-center mt-10">
          {/* Grid para organizar las tarjetas */}
          <div className="flex flex-col gap-6 mt-8">
            {/* Recorremos cada proveedor */}
          {filteredProveedores.length > 0 ? (
            filteredProveedores.map((proveedor, i) => (
              <ProveedorCard 
                key={i}
                imagen={proveedor.imagen}
                nombre={proveedor.nombre}
                telefono={proveedor.telefono}
                redes={proveedor.redes}
               />
            ))
            ) : (
              <p className="text-gray-500 text-center">No se encontraron coincidencias.</p>
            )}
          </div>
        </div>

        {/* Botón flotante de agregar */}
        <Link to="/Addproveedor">
          <button className="fixed bottom-8 right-8 bg-cyan-300 hover:bg-cyan-500 text-cyan-800 p-4 rounded-full shadow-lg">
            <FaPlus size={24} />
          </button>
        </Link>

      </main>
    </div>
  );
}
