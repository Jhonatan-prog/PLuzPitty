const ProductCard = ({ imgSrc, name, price }: producto) => {
  return (
    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 shadow-md w-72 text-center hover:shadow-lg transition">
      <img src={imgSrc} alt={name} className="w-32 h-32 object-contain mx-auto mb-4" />
      <h2 className="font-semibold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-600">${price} COP</p>
    </div>
  );
};

export default ProductCard;

