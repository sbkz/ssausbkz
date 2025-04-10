import { Router } from'express';
import { addVacancy, updateProduct, updateVacancy, addProduct } from '../controllers/admin-controllers.js';


const router = Router();

router.put('/update/product', updateProduct); // /admin/update/product
router.put('/update/vacancy', updateVacancy); // /admin/update/vacancy
router.post('/add/vacancy', addVacancy);// /admin/add/vacancy
router.post('/add/product', addProduct);

export default router