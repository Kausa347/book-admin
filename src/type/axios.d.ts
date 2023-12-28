import {AxiosRequestConfig} from "axios";

declare module 'axios' {
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>,
        success:string
    }
    export interface AxiosResponse <T = any> extends AxiosInstance {
    }
}