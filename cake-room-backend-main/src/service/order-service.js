import OrderModel from '../models/order.js';
import UserModel from '../models/user.js';
import ApiError from '../exceptions/api-error.js';
import mongoose from 'mongoose';
import {Product} from '../models/product.js'
import { v4 as uuidv4 } from 'uuid';


class OrderService {
    async getAllOrders () {
        try{
            const orders = await OrderModel.find();
            return orders;
        } catch (e) {
            console.error("Ошибка в сервисе при получении всех заказов:", e); // Логируем ошибку
            throw e; // Перебрасываем ошибку, чтобы ее обработал контроллер
        }       
    }
    //сейчас работает норм
    async getOrdersById (userId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw ApiError.BadRequest('Невалидный userId', []);
            }
            const user = await UserModel.findById(userId);
        
            
            if(!user){
                throw ApiError.NotFound(`Пользователь с userId ${userId} не найден`, []); // Используем ApiError
            }

            const orders = await OrderModel.find({userId});
            return orders
        } catch(e){
            console.error("Ошибка при получении заказов по userId в сервисе:", e);
            throw e; // Перебрасываем ошибку, чтобы ее обработал контроллер
        }
    }
    // старая версия
    // async getOrdersById (userId) {
    //     try {
    //         if (!mongoose.Types.ObjectId.isValid(userId)) {
    //             throw ApiError.BadRequest('Невалидный userId', []);
    //         }
    //         const clientId = await UserModel.findOne({_id: userId });
    //         if(!clientId){
    //             throw ApiError.BadRequest(`Пользователь с userId ${userId} не найден`, []); // Используем ApiError
    //         }
    //         const orders = await OrderModel.find({userId});
    //         return orders
    //     } catch(e){
    //         console.error("Ошибка при получении заказов по userId в сервисе:", e);
    //         throw e; // Перебрасываем ошибку, чтобы ее обработал контроллер
    //     }
    // }
   
    // async makeNewOrder (purchasedAutoParts, userId) {
    //     try{
    //         const orderId = uuidv4();

    //         const user = await UserModel.findById({_id: userId});
    //         if (!user) {
    //             throw ApiError.BadRequest(`Пользователь с userId ${userId} не найден`, []);
    //         }

    //         const products = await Product.find({
    //             _id: { $in: purchasedAutoParts }
    //           });
    //         console.log(products);
    //           if (!products) {
    //             throw ApiError.BadRequest(`Продукты с id ${products} не найдены`, []);
    //         }


    //         const order = await OrderModel.create({orderId, userId, purchasedAutoParts:products});
    //         return order;
    //     } catch(e) {
    //         console.error("Ошибка при создании нового заказа в сервисе:", e);
    //         throw e; // Перебрасываем ошибку, чтобы ее обработал контроллер
    //     }
    // }
    async makeNewOrder(purchasedProducts, req) {
        try {
            const userId = req.user.id;
            const user = await UserModel.findById(userId);
            if (!user) {
                throw ApiError.BadRequest(`Пользователь с userId ${userId} не найден`, []);
            }

            // Проверяем активацию пользователя
            if (!user.isActivated) {
                throw ApiError.Forbidden('Пользователь не активирован. Сначала нужно активировать свой профиль', []);
            }

            // Проверяем, что все продукты существуют и получаем их
            const productsWithQuantities = [];
            let totalPrice = 0;
            for (const item of purchasedProducts) {
                const productId = item.product;
                const quantity = item.quantity;

                //Проверка quantity
                if (quantity <= 0){
                    throw ApiError.BadRequest(`Количество продукта с id ${productId} должно быть больше 0`, [])
                }

                //Нужно ObjectId
                 if (!mongoose.isValidObjectId(productId)){
                    throw ApiError.BadRequest(`Не валидный product id - ${productId}`, [])
                 }

                const product = await Product.findById(productId);
                if (!product) {
                    throw ApiError.BadRequest(`Продукт с id ${productId} не найден`, []);
                }

                productsWithQuantities.push({
                    product: product, // Сохраняем только ObjectId
                    quantity: quantity
                });
                console.log(product.price, quantity)
                totalPrice += Number(product.price) * quantity; // Подсчет общей стоимости
            }

            console.log(totalPrice)
   
            const order = await OrderModel.create({
                userId,
                purchasedProducts: productsWithQuantities,
                totalPrice // Сохраняем общую стоимость
            });

            return order;
        } catch (e) {
            console.error("Ошибка при создании нового заказа в сервисе:", e);
            throw e; // Перебрасываем ошибку, чтобы ее обработал контроллер
        }
    }


    async statusChange(orderId, newStatus) { 
        try {
            const order = await OrderModel.findByIdAndUpdate(
                orderId,
                { status: newStatus },
                { new: true } // Возвращает обновленный документ
            );
            return order; // Возвращаем обновленный заказ

        } catch(e){
            console.error("Ошибка при обновлении статуса заказа в сервисе:", e);
            throw e; // Перебрасываем ошибку, чтобы ее обработал контроллер
        }
    }
}

export default new OrderService()