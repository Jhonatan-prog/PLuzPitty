import axios from "axios";
import { AxiosResponse } from "axios";
import { User } from "../types/user";
import { Fetch } from "../types/generic";

class Request {
    baseUrl: string;
    data: User | {} | undefined;
    fetchObj: any;

    constructor(BASE_URL: string, data?: User | {}) {
        this.baseUrl = BASE_URL;
        this.data = Object.keys(data as object).length ? data : {}
        this.fetchObj = {}
    }

    async fetch(fetchParams: Fetch) {
        const fp = fetchParams;
        try {
            const axResponse: AxiosResponse = await fp.request.method.axiosCallback(this.baseUrl + fp.request.URN, this.data);
            if (axResponse.statusText.toLocaleLowerCase().trim() === 'ok') {
                return {
                    'status': axResponse.status,
                }
            }

            return axResponse.data
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

    async create(
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
                    type: 'POST' as Fetch['request']['method']['type'],
                    axiosCallback: axios.post,
                },
                header: {
                    "Content-Type": 'application/json',
                    ...fetchObjConfig?.header
                },
                body: this.data,
            },
            error: { 
                message: "Server problem"
            }
        }

        const data = await this.fetch(fetchObj);

        return true;
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
