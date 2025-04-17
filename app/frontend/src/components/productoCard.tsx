// src/components/ProductoCard.tsx
import React from 'react';
import { Card, CardContent } from '../components/ui(userInterface)/card';
import { Producto } from '../types/products';
import { formatearPrecio } from '../utils/formatearPrecio';

interface Props {
  producto: Producto;
}

const ProductoCard: React.FC<Props> = ({ producto }) => {
  return (
    <Card className="producto-card">
      <CardContent>
        <img src={producto.imagen} alt={producto.nombre} className="imagen-producto" />
        <h2 className="nombre-producto">{producto.nombre}</h2>
        <p className="precio-producto">{formatearPrecio(producto.precio)}</p>
      </CardContent>
    </Card>
  );
};

export default ProductoCard;
