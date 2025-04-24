import { User } from "./user";
import {AxiosResponse} from "axios";

interface ErrorHandler {
    errorMessage: string;
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface Fetch {
    URN: string;
    method: Method;
    header: { [key: string]: any };
    body?: { [key: string]: any };
    axiosCallback: (url: string, data?: any) => any
    errorHandler: ErrorHandler;
}

export { Fetch, ErrorHandler };
