import ApiError from "../exceptions/api-error.js";
import {Product} from "../models/product.js";
import Vacancy from "../models/vacancy.js";
import mongoose from 'mongoose';

class AdminService {
    async updateProduct(productId, newProductData){
        try{
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                throw ApiError.BadRequest('Невалидный productId', []);
            }
            const objectIdProductId = new mongoose.Types.ObjectId(productId);

            const product = await Product.findOne({_id: productId});
            if(!product){
                throw ApiError.ItemNotExits('Продукт не найден', [])
            }
            await Product.updateOne({_id: objectIdProductId}, {$set: newProductData})
            
            const updatedProduct = await Product.findOne({_id: objectIdProductId});
            return updatedProduct;
        }catch(e){
            console.error("Ошибка при обновлении продукта:", e);
            throw e;
        }
    }

    async updateVacancy(_id, newVacancyData){
        try {
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                throw ApiError.BadRequest('Невалидный _id вакансии', []);
            }

            const objectIdVacancyId = new mongoose.Types.ObjectId(_id);
            const vacancy = await Vacancy.findById(objectIdVacancyId);
            
            if(!vacancy){
                throw ApiError.ItemNotExits('Вакансия не найдена', [])
            }

            await Vacancy.updateOne({_id: objectIdVacancyId}, {$set: newVacancyData});
            const updatedVacancy = await Vacancy.findById(objectIdVacancyId);
            
            return updatedVacancy;
        } catch (e) {
            throw e;
        }
    }

    async addVacancy(newVacancy) {
        try {
            if (!newVacancy) {
                  throw ApiError.BadRequest('Нет данных для создания вакансии', []);
             }
 
             const addNewVacancy = await Vacancy.create(newVacancy);
             return addNewVacancy;
         } catch (e) {
             console.error("Ошибка при добавлении вакансии:", e);
             throw e;
         }
    }

    async addProduct(newProduct) {
        try {
            if (!newProduct) {
                throw ApiError.BadRequest('Нет данных для создания продукта', []);
            }

            const addNewProduct = await Product.create(newProduct);
            return addNewProduct;
        } catch (e) {
            console.error("Ошибка при добавлении продукта:", e);
            throw e;
        }
    }
}
export default new AdminService()