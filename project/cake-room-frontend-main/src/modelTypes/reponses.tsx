import {AxiosResponse} from 'axios';

export interface IUser {
    email: string,
    isAcivated: boolean,
    id: string,
    role: string
}
export interface AuthResponse extends AxiosResponse {
    accessToken: string,
    refreshToken: string,
    user: IUser
}

export interface IProduct {
    title: string,
    proteins: number,
    fats: number,
    carbohydrates: number,
    photoPath: string,
    _id: string,
    energy: number,
    expiration: number,
    price: number,
    composition: string,
    box_weight: number,
    isActive: boolean,
    description: string
}
export interface IVacancy {
    title: string,
    conditions: string[],
    duties: string[],
    requirements: string[],
    salary: string,
    description: string,
    isActive: boolean,
    _id: string
}