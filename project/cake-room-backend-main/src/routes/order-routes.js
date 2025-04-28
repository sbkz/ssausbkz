import express from 'express';
import {
    getAllOrders,
    getOrdersById,
    makeNewOrder,
    statusChange
} from "../controllers/order-controller.js"
import { authMiddleware } from '../middlewares/auth-middleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllOrders) // /api/orders
router.get('/:userId', authMiddleware, getOrdersById) // /api/orders/:userId
router.post('/', authMiddleware, makeNewOrder) // /api/orders
router.put('/status', authMiddleware, statusChange) // /api/orders/status

export default router