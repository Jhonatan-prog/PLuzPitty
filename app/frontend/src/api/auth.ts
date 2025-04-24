import { User } from "../types/user";
import { Request } from "./requests";
import Cookies from "js-cookie";

type LoginData = {
    Correo: User["Correo"];
    Contraseña: User["Contraseña"];
}

class Auth {
    request: Request;
    isAuthenticated: boolean;
    cred: LoginData | undefined;

    constructor(request: Request | undefined, cred?: LoginData) {
        this.request = request ? request : new Request('http://localhost:5000', {});
        this.isAuthenticated = false;
        this.cred = cred;
    }

    async login() {
        this.cred = {
            Correo: (this.request.data as User).Correo,
            Contraseña: (this.request.data as User).Contraseña
        }

        const response = await this.request.post('auth/login', this.cred);
        if (response && response.data) {
            const { token } = response.data;
            Cookies.set("token", token, { expires: 7 });
        } else {
            throw new Error("Invalid response from server");
        }
    }

    logout() {
        const AccessToken = Cookies.get("token");
        if (AccessToken) {
            Cookies.remove("token")
        }

        window.location.replace("http://localhost:5173/login")
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
