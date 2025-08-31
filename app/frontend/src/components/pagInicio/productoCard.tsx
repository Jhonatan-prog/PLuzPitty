import { producto } from "../../types/productsProps";

const ProductCard = ({ imagen, nombre, vlrUnitario }: producto) => {// La ProductCard recibe los siguientes parámetros: una imagen (imgSrc), un nombre (name) y un precio (price)
  return (
    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 shadow-md w-72 text-center hover:shadow-lg transition">
      <img src={`http://localhost:5000/imagenes/productos/${imagen}`} alt={nombre} className="w-32 h-32 object-contain mx-auto mb-4" />
      <h2 className="font-semibold text-gray-800">{nombre}</h2>
      <p className="text-sm text-gray-600">${vlrUnitario} COP</p>
    </div>
  );
};

export default ProductCard;

