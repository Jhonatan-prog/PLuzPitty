import Sidebar from '../../components/pagInicio/sidebar';
import Header from '../../components/pagInicio/header';
import ProductCard from '../../components/pagInicio/productoCard';
import { useEffect, useState } from 'react';
import { producto } from '../../types/productsProps';
import { Request } from "../../api/requests";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppDispatch';

export default function Dashboard() {
  //almacena los productos
  const [producto, setProductos] = useState<producto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    navigate('/login')
  }

  const [filteredProductos, setFilteredProductos] = useState<producto[]>([]); //almacena los productos filtrados
  
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
    if (query.trim() === '') {
      // Si la búsqueda está vacía, mostramos todos los productos
      setFilteredProductos(producto);
    } else {
      // Filtramos los productos que coinciden con la búsqueda por nombre
      const filtered = producto.filter((products) =>
        products.nombre.toLowerCase().includes(query.toLowerCase())
      );
      //se le asigna al filtro el filtro que acabamos de hacer por nombre
      setFilteredProductos(filtered);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-6">
        <Header onSearch={handleSearch} />
        {/* Título */}
        <h1 className="text-3xl font-semibold text-purple-400 text-center mt-23">
          Productos
        </h1>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/*Contenedor de productos */}
        {/* Aquí vamos a colocar las tarjetas de productos */}
        <div className="mt-10 px-10">
          {/* Grid o cuadricula para organizar las tarjetas */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] place-items-center gap-6 mt-8 ">
            {filteredProductos.length > 0 ?(
            filteredProductos.map((producto, i) => (
              <ProductCard
                key={i}
                imagen={producto.imagen}
                nombre={producto.nombre}
                vlrUnitario={producto.vlrUnitario}
              /> 
            ))
            ) : (
              <p className="text-gray-500 text-center">No se encontraron productos.</p> 
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
