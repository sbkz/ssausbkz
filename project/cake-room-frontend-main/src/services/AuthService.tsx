import $api from "../http";
import {AxiosResponse} from 'axios';
import { AuthResponse } from "../modelTypes/reponses";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return  $api.post('/api/auth/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return  $api.post<AuthResponse>('/api/auth/registration', {email, password})
    }

    static async logout(): Promise<void>{
        return  $api.post('/api/auth/logout')
    }

    static async refresh(): Promise<AxiosResponse<AuthResponse>> {
        return $api.get<AuthResponse>('/api/auth/refresh', {withCredentials: true})
    }
}
