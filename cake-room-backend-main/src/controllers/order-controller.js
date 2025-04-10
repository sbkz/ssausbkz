import OrderService from "../service/order-service.js";
//+

    const makeNewOrder = async (req, res, next) => {
        try {
            const {purchasedProducts} = req.body;

            console.log(req.user)

            if (!purchasedProducts || !(purchasedProducts.length > 0)) {
                return res.status(400).json({ message: "Необходимо указать purchasedProducts" });
            }

            const order = await OrderService.makeNewOrder(purchasedProducts, req);
            
            return res.status(201).json(order);

        } catch (e) {
            console.error("Ошибка при создании нового заказа:", e);
            next(e)
        }
    }
    const getAllOrders = async (req, res, next) => {
        try {
            const orders = await OrderService.getAllOrders()
            if(!orders || orders.length === 0){
                return res.status(404).json({message : "Заказы не найдены"});
            }
            
            return res.json(orders)
       
        } catch (e) {
            console.error("Ошибка при получении всех заказов:", error);
            next(e)
        }
    }
    const getOrdersById = async (req, res, next)  => {
        try {
            const userId = req.params.userId;

            if (!userId) {
                return res.status(400).json({ message: "Необходимо указать userId" });
            }

            const orders = await OrderService.getOrdersById(userId);

            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: `Заказы для userId ${userId} не найдены` });
            }
    
            return res.json(orders)
        } catch (e) {
            console.error("Ошибка при получении заказов по userId:", e);
            next(e)
        }
    }

    const statusChange = async (req, res, next)  => { 
        try {
            const { _id: orderId, status } = req.body;
            
            if (!orderId || !status) {
                return res.status(400).json({ message: "Необходимо указать orderId и newStatus" });
            }
            
            const order = await OrderService.statusChange(orderId, status);
            
            if (!order) {
                return res.status(404).json({ message: `Заказ с orderId ${orderId} не найден` });
            }
            
            return res.json(order);
        } catch (e) {
            console.error("Ошибка при изменении статуса заказа:", e);
            next(e);
        }
    }

export {
    makeNewOrder,
    getAllOrders,
    getOrdersById,
    statusChange
}