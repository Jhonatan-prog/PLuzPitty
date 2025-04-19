import { useState } from "react";
import { Bell } from "lucide-react";
import logo from "../assets/iconoLuzPitty.png";

const Header = () => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!query.trim()) return;
  
    try {
      const response = await fetch(`/api/productos?search=${query}`);
  
      // Validar si es una respuesta JSON
      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text(); // Para debug
        console.error("Respuesta inesperada:", text);
        throw new Error("Respuesta no es JSON");
      }
  
      const data = await response.json();
      console.log("Resultados:", data);
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  return (
    <header className="w-full bg-gray-200 px-30 py-4 flex justify-between items-center fixed top-0 left-0 z-50 shadow-md">
      {/* Logo */}
      <img src={logo} alt="Logo Luz Pitty" className="h-15" />

      {/* Buscador */}
      <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
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
