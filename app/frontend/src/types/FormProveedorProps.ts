export interface ProveedorFormValues {
    Nit: string;
    Nombre: string;
    NombreContacto: string;
    Telefono: string;
    Direccion: string;
    Redes: string;
    imagen: string | null; 
  }
  
  export interface FormularioProductoProps {
    onSubmit: (data: ProveedorFormValues) => void;
  }