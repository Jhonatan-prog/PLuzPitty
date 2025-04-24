interface User {
    NombreUsuario: string;
    Correo: string;
    Contraseña: string;
    Telefono: string;
    NombreRol: string;
}

type LoginData = {
    Correo: User["Correo"];
    Contraseña: User["Contraseña"];
}

export { User, LoginData };
