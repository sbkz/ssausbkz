import {Product} from "../models/product.js";
import ApiError from '../exceptions/api-error.js';
//+
const getAllProducts = async (req, res, next) => {
    try{
        const products = await Product.find();
        return res.json(products);

    } catch (e) {
        console.error("Ошибка при получении всех продуктов:", e);
        next(ApiError.InternalServerError("Ошибка при получении всех продуктов", [e.message]));
    }
};
const getSumProducts = async (req, res, next) => {
    try{
        const sum = await Product.countDocuments(); // count() устарел
        return res.json(sum);
    } catch(e){
        console.error("Ошибка при получении количества продуктов:", error);
        next(ApiError.InternalServerError("Ошибка при получении количества продуктов", [e.message]));
    }
};
const getSomeProductsForCatalog = async (req, res, next) => {

    try {
        let skipProducts = 0; // Значение по умолчанию
        if (req.query.skip) {
            skipProducts = parseInt(req.query.skip, 10); 
            if (isNaN(skipProducts)) {
                return next(ApiError.BadRequest("Параметр skip должен быть числом", []));
            }
        }

        const products = await Product.find().skip(skipProducts).limit(15);
        return res.json(products);
    } catch (e) {
        console.error("Ошибка при получении продуктов для каталога:", e);
        next(ApiError.InternalServerError("Ошибка при получении продуктов для каталога", [e.message]));
    }
}

const getProductById = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const product = await Product.findById( req.params.id); 
        if (!product) {
            return next(ApiError.NotFound("Продукт не найден", []));
        }
        return res.json(product);
    } catch (e) {
        console.error("Ошибка при получении продукта по ID:", e);
        next(ApiError.InternalServerError("Ошибка при получении продукта по ID", [e.message]));
    }
}

export {
    getAllProducts,
    getSomeProductsForCatalog,
    getSumProducts,
    getProductById,
}