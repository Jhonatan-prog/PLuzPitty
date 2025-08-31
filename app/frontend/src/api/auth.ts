import { User, LoginData } from "../types/user";
import { logout as authLogout } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { Request } from "./requests";
import Cookies from "js-cookie";
import { decodeJwtPayload } from "../utils/encode";

// Esta función maneja la autenticación de los usuarios, incluyendo el inicio de sesión, cierre de sesión y verificación del estado de autenticación.
// Utiliza cookies para almacenar el token de acceso y Redux para manejar el estado de autenticación en la aplicación.
// Se creo con el fin de manejar la autenticación de los usuarios en la aplicación, 
// permitiendo el inicio de sesión y el cierre de sesión, así como la verificación del estado de autenticación.
class Auth {
    request: Request;
    isAuthenticated: boolean;
    cred: LoginData | undefined;
    dispatch: any;

    constructor(request: Request | undefined, cred?: LoginData) {
        this.request = request ? request : new Request('http://localhost:5000', {});
        this.isAuthenticated = false;
        this.cred = cred;
        this.dispatch = useAppDispatch();
    }

    async login(persistent: boolean) {
        if (!this.cred) {
            this.cred = {
                Correo: (this.request.data as User).Correo,
                Contraseña: (this.request.data as User).Contraseña
            }
        } else {
            this.request.newData = this.cred;
        }

        const response = await this.request.post('auth/login', this.cred);
        if (response && response.data) {
            const { token } = response.data;

            if (!persistent) return Cookies.set("token", token)

            Cookies.set("token", token, { expires: 7 });

            return response.data;
        }

        return {
            data: undefined,
            message: "400 Bad Request",
            status: 400,
        };
    }

    logout() {
        const AccessToken = Cookies.get("token");

        if (AccessToken) {
            Cookies.remove("token")
        }

        this.dispatch(authLogout());
    }

    authenticated() {
        const AccessToken = Cookies.get("token");
        if (AccessToken && !this.isAuthenticated) {
            this.isAuthenticated = true;
        } else {
            this.isAuthenticated = false;
        }

        return this.isAuthenticated;
    }

    async verify() {

    }
}

export { Auth };
