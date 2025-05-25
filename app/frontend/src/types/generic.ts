import { User } from "./user";
import {AxiosResponse} from "axios";

interface Error {
    message: string;
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface Fetch {
    request: {
        URN: string;
        method: { 
            type: Method
            axiosCallback: (url: string, data?: any) => any
        };
        header: { [key: string]: any };
        body?: { [key: string]: any };
    }
    error: Error;
}


export { Fetch, Error as ErrorObj };
