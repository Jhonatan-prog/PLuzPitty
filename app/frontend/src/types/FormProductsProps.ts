export interface ProductoFormValues {
    CodigoProducto: string;
    Nombre: string;
    Descripcion: string;
    VlrUnitario: number;
    VlrSinIva: number;
    VlrCompra: number;
    Stock: number;
    FechaIngreso: string;
    imagen: string | null;
  }
  
  export interface FormularioProductoProps {
    onSubmit: (data: ProductoFormValues) => void;
  }