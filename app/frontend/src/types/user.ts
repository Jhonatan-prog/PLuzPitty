interface User {
    IdUsuario?: number;
    NombreUsuario: string;
    Correo: string;
    Contraseña: string;
    Telefono?: number;
    Direccion?: string;
    NombreRol?: string;
}

export { User };
