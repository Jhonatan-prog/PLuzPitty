import axios from "axios";
import { AxiosResponse } from "axios";
import { User } from "../types/user";
import { Fetch } from "../types/generic";

class Request {
    baseUrl: string;
    data: User | {} | undefined;

    constructor(BASE_URL: string, data?: User | {}) {
        this.baseUrl = BASE_URL;
        this.data = Object.keys(data as object).length ? data : {}
    }

    async fetch(fetchParams: Fetch) {
        const fp = fetchParams;
        try {
            const axResponse: AxiosResponse = await fp.axiosCallback(this.baseUrl + fp.URN, this.data);
            if (!axResponse.status) {
                return {
                    'status': axResponse.status,
                }
            }

            return axResponse.data
        } catch (error) {
            console.error(fp.errorHandler.errorMessage);
        }
    }

    async get() {
        try {
          const response = await axios.get('/user?ID=12345');
          console.log(response);
        } catch (error) {
          console.error(error);
        }
    }

    async create(
        tableName: string, 
        fetchObjConfig?: { 
            header: { 
                "Content-Type": 'application/json', 
                [key: string]: any
            } 
        }) {
        const fetchObj = {
            URN: `/api/${tableName}`,
            method: 'POST' as Fetch['method'],
            header: {
                "Content-Type": 'application/json',
                ...fetchObjConfig?.header
            },
            body: this.data,
            axiosCallback: axios.post,
            errorHandler: { 
                errorMessage:"The user could not be created."
            }
        }
        const data = await this.fetch(fetchObj);

        return data;
    }

    set newData(newData: User) {
        this.data = newData;
    }

    set newBaseUrl(newBaseUrl: string) {
        this.baseUrl = newBaseUrl;
    }
}

const defaultRequest = new Request('http://localhost:5000');

export { Request, defaultRequest };
