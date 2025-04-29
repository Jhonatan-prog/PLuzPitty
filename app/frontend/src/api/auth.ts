import { User, LoginData } from "../types/user";
import { Request } from "./requests";
import Cookies from "js-cookie";

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
            Cookies.set("token", token, { expires: 7 });
        } else {
            throw new Error("Invalid response from server");
        }

        return response;
    }

    logout() {
        const AccessToken = Cookies.get("token");
        if (AccessToken) {
            Cookies.remove("token")
        }
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
