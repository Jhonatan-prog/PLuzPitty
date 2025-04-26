import { FaEdit } from "react-icons/fa";

const ProveedorCard = ({ imgSrc, name, Tel, description}: ProveedorProps) => {
  return (
    <div className="flex bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 shadow-md w-[650px] h-[200px] items-center justify-between hover:shadow-lg transition">
      
      {/* Imagen */}
      <div className="w-32 h-32 flex-shrink-0">
        <img src={imgSrc} alt={name} className="w-full h-full object-contain" />
      </div>

      {/* Info del producto */}
      <div className="flex-1 px-6 text-left">
      <h2 className="text-lg font-semibold text-gray-700 mb-1">{name}</h2>
        <p className="font-bold text-gray-800 mb-1">Tel: {Tel}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Botón de editar */}
      <div className="flex flex-col items-center gap-4">
        <button className="bg-cyan-200 hover:bg-cyan-300 text-cyan-800 p-2 rounded-full">
          <FaEdit size={18} />
        </button>
      </div>

    </div>
  );
};

export default ProveedorCard;
      