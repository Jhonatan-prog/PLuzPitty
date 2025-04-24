import axios from "axios";
import { AxiosResponse } from "axios";
import { User, LoginData } from "../types/user";
import { Fetch } from "../types/generic";

class Request {
    baseUrl: string;
    data: User | LoginData | {};

    constructor(BASE_URL: string, data: User | {}) {
        this.baseUrl = BASE_URL;
        this.data = Object.keys(data as object).length ? data : {}
    }

    async fetch(fetchParams: Fetch) {
        const fp = fetchParams;
        try {
            const axResponse: AxiosResponse = await fp.request.method.axiosCallback(this.baseUrl + fp.request.URN, this.data);
            if (axResponse.status >= 400) {
                throw new Error(
                `Unable to ${fp.request.method.type.toLowerCase()}, server problem with status: ${axResponse.status}`
                );
            }

            return {
                data: axResponse.data,
                status: axResponse.status
            }
        } catch (error) {
            console.error(fp.error.message);
        }
    }

    async get(
        tableName: string, 
        fetchObjConfig?: { 
            header: { 
                "Content-Type": 'application/json', 
                [key: string]: any
            }
        }) {

        const fetchObj = {
            request: {
                URN: `/api/${tableName}`,
                method: {
                    type: 'GET' as Fetch['request']['method']['type'],
                    axiosCallback: axios.get
                },
                header: {
                    "Content-Type": 'application/json',
                    ...fetchObjConfig?.header
                },
            },
            error: { 
                message: "Server problem"
            }
        }

        const data = await this.fetch(fetchObj);
        
        return data;
    }

    async post(
        path: string,
        body?: any,
        fetchObjConfig?: { 
            header: { 
                "Content-Type": 'application/json', 
                [key: string]: any
            } 
        }) {
        const fetchObj = {
            request: {
                URN: `/api/${path}`,
                method: {
                    type: 'POST' as Fetch['request']['method']['type'],
                    axiosCallback: axios.post,
                },
                header: {
                    "Content-Type": 'application/json',
                    ...fetchObjConfig?.header
                },
                body: this.data || body,
            },
            error: { 
                message: "Server problem"
            }
        }

        return await this.fetch(fetchObj);
    }

    set newData(newData: { [key: string]: any }) {
        this.data = newData;
    }

    set newBaseUrl(newBaseUrl: string) {
        this.baseUrl = newBaseUrl;
    }
}

export { Request };
