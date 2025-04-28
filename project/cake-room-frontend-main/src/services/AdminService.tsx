import $api from "../http";
import {AxiosResponse} from 'axios';
import { IProduct, IVacancy } from "../modelTypes/reponses";
import { newProductDataDto, newVacancyDataDto } from "../dtos/adminDtos";

export default class AdminService {
    static async getProducts(): Promise<AxiosResponse<IProduct[]>> {
        return $api.get<IProduct[]>('/api/products')
    }
    static async updateProduct(newProductData: newProductDataDto): Promise<AxiosResponse<IProduct>> {
        return $api.put<IProduct>('/admin/update/product', {newProductData})
    }

    static async getVacancies(): Promise<AxiosResponse<IVacancy[]>> {
        return $api.get<IVacancy[]>('/api/vacancies')
    }
    //с типами разобраться
    static async updateVacancy(newVacancyData: newVacancyDataDto): Promise<AxiosResponse<IVacancy>> {
        return $api.put<IVacancy>('/admin/update/vacancy', {newVacancyData})
    }
    static async addVacancy(newVacancy: Omit<IVacancy, '_id'>): Promise<AxiosResponse<IVacancy>> {
        return $api.post<IVacancy>('/admin/add/vacancy', {newVacancy})
    }
}