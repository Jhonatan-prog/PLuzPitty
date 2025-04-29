import { useState } from "react";
import { Bell } from "lucide-react";
import logo from "../../assets/iconoLuzPitty.png";

//Se agrega una prop onSearch al componente Header para que pueda enviar el texto al Dashboard
const Header = ({onSearch}: {onSearch?: (query: string) => void}) => { //el onSearch? quiere decir que es opcional
  const [query, setQuery] = useState("");// Estado para almacenar el texto del buscador
  //Especifica q el evento es un cambio, y que proviene de un elemento HTML de tipo input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {// Maneja el evento de búsqueda
    const value = e.target.value;// Obtenemos el valor del input
    setQuery(value);// Actualizamos el estado del input
    if (onSearch) {// Llama a onSearch solo si está definido
      onSearch(value);// Llamamos a la función onSearch para enviar el texto al Dashboard
    }
  };
 
  return (
    <header className="w-full bg-gray-200 px-30 py-4 flex justify-between items-center fixed top-0 left-0 z-50 shadow-md">
      {/* Logo */}
      <img src={logo} alt="Logo Luz Pitty" className="h-15" />
 
      {/* Buscador */}
      <form className="flex-1 max-w-xl mx-6">
        <div className="relative">
          <input
            type="text"
            value={query}// Lo que hayamos escrito en el buscador
            onChange={handleSearch}// Cuando escribamos algo en el buscador, se llamará a la función handleSearch
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
  );
};
 
export default Header;
