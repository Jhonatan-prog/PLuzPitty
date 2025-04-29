export interface ProductoFormValues {
    codigo: string;
    nombre: string;
    cantidad: number;
    fechaIngreso: string;
    valorUnitario: number;
    valorSinIVA: number;
    valorCompra: number;
    imagen: File | null;
  }
  
  export interface FormularioProductoProps {
    onSubmit: (data: ProductoFormValues) => void;
  }