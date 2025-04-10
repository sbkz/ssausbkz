import AdminService from "../service/admin-service.js";
import { validationResult } from 'express-validator'; // Для валидации данных
import ApiError from '../exceptions/api-error.js'; 
import mongoose from 'mongoose'; 


export const updateProduct = async (req, res, next) => {
    try {
        const errors = validationResult(req); // Проверяем ошибки валидации 
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
        }

        const {newProductData} = req.body;
        const productId = newProductData._id

        if (!productId || !newProductData) {
            return next(ApiError.BadRequest("Необходимо предоставить productId и newProductData"));
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return next(ApiError.BadRequest('Невалидный productId', []));
        }

        const product = await AdminService.updateProduct(productId, newProductData)
        if (!product) {
            return next(ApiError.NotFound("Продукт не найден")); // Если AdminService вернул null
        }
        return res.json(product)
    } catch(e) {
        console.error("Ошибка при обновлении продукта:", e);
        next(e)
    }
};

export const updateVacancy = async (req, res, next)  => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
        }
        
        const {newVacancyData} = req.body;

        if (!newVacancyData || !newVacancyData._id) {
            return next(ApiError.BadRequest("Необходимо предоставить _id в newVacancyData"));
        }

        const vacancyId = newVacancyData._id;
        
        if (!mongoose.Types.ObjectId.isValid(vacancyId)) {
            return next(ApiError.BadRequest('Невалидный ID вакансии', []));
        }

        const vacancy = await AdminService.updateVacancy(vacancyId, newVacancyData);
        
        if (!vacancy) {
            return next(ApiError.NotFound("Вакансия не найдена"));
        }

        return res.json(vacancy);
    } catch(e) {
        next(e);
    }
};

export const addVacancy = async (req, res, next)  => {
    try {
        const errors = validationResult(req); // Проверяем ошибки валидации
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
        }
        const { newVacancy } = req.body;

        if (!newVacancy) {
            return next(ApiError.BadRequest("Необходимо предоставить newVacancy"));
        }
        const vacancy = await AdminService.addVacancy(newVacancy)

        if (!vacancy) {
            return next(ApiError.InternalServerError("Не удалось добавить вакансию"));
        }
        
        return res.status(201).json(vacancy)
    } catch(e) {
        console.error("Ошибка при добавлении вакансии:", e);
        next(e)
    }
};

export const addProduct = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
        }
        const { newProduct } = req.body;

        if (!newProduct) {
            return next(ApiError.BadRequest("Необходимо предоставить newProduct"));
        }
        const product = await AdminService.addProduct(newProduct);

        if (!product) {
            return next(ApiError.InternalServerError("Не удалось добавить продукт"));
        }
        
        return res.status(201).json(product);
    } catch(e) {
        console.error("Ошибка при добавлении продукта:", e);
        next(e);
    }
};