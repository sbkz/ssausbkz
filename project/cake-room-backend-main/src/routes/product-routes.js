import express from 'express';
import {
    getAllProducts,
    getSomeProductsForCatalog,
    getSumProducts,
    getProductById
} from '../controllers/product-controller.js'

const router = express.Router();


router.get('/', getAllProducts) // /api/products
router.get('/sum', getSumProducts) // /api/products/sum
router.get('/catalog', getSomeProductsForCatalog )// /api/products/catalog
router.get('/:id', getProductById) // /api/products/:id


export default router