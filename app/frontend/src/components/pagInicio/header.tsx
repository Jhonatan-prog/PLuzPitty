import { useState } from "react";
import { Bell } from "lucide-react";
import logo from "../../assets/iconoLuzPitty.png";
import { producto } from '../../types/productsProps';
import ProductCard from '../pagInicio/productoCard';
import { Request } from "../../api/requests"; //importa la clase Request


const Header = () => {

  interface ApiResponse {
    data: any;
    status: number;
  }

  const [query, setQuery] = useState(""); //para lo que escribe el usuario
  const [results, setResults] = useState<producto[]>([]); //para guardar resultados de búsqueda

  // Instanciamos Request
  const request = new Request('http://localhost:5000', {}); 

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // para que no recargue la página

    if (!query.trim()) {
      setResults([]); // Limpiar resultados si el campo está vacío
      return;
    }

    try {
      // Hacemos un GET a una ruta de búsqueda
      const response = await request.get('Producto/ConsultarTodos') as ApiResponse; // Hacemos la petición a la API y guardamos la respuesta en response
      console.log('Datos del servidor:', response?.data);

      if (response && response.data) {//Verificamos que sí haya respuesta del servidor y que esa respuesta tenga datos.
        const productosFormateados: producto[] = response.data.map((item: any) => ({
          imgSrc: `http://localhost:5000/uploads/${item.imagen}`,
          name: item.descripcion,
          price: item.vlrUnitario?.toString() || '0',    
          }));
        console.log('Productos formateados:', productosFormateados);
        setResults(productosFormateados); //Si sí hay datos, los guardamos en el estado results para mostrarlos en pantalla.
      } else {
        setResults([]); //	Si no hay datos (por ejemplo si el servidor no envió nada), ponemos results como un array vacío (nada para mostrar).
      }
    } catch (error) {
      console.error("Error buscando:", error);
      setResults([]);
    }
  };
 
  return (
    <>
    <header className="w-full bg-gray-200 px-30 py-4 flex justify-between items-center fixed top-0 left-0 z-50 shadow-md">
      {/* Logo */}
      <img src={logo} alt="Logo Luz Pitty" className="h-15" />

      {/* Buscador */}
      <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-6">
        <div className="relative">
          <input
            type="text"
            value={query}// Lo que hayamos escrito en el buscador
            onChange={(e) => setQuery(e.target.value)}// Cada vez que escribimos, actualiza el valor
            placeholder="Buscar"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {/*Ícono de la lupa */}
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            🔍
          </span>
        </div>
      </form>

      {/* Ícono de campana */}
      <Bell className="w-6 h-6 text-black" />
    </header>

    {/* Resultados de búsqueda*/}
    <section className="mt-28 container mx-auto px-4">
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {results.map((item, index) => (
        <ProductCard
          key={index}
          imgSrc={item.imgSrc}
          name={item.name}
          price={item.price}
        />
      ))}
        </div>
      ) : query && (//si escribió algo pero no hay resultados
        <p className="text-center text-gray-500 mt-10">No se encontraron resultados.</p>
      )}
    </section> 
    </>
  );
};

export default Header;
