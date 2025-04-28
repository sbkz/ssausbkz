import { Router } from'express';
import { body } from 'express-validator';
import { 
    getUsers,
    registration,
    login,
    logout,
    refresh
 } from '../controllers/user-controller.js';
 import { authMiddleware } from '../middlewares/auth-middleware.js';

const router = Router();

router.post('/registration',  // /api/auth/registration
body('email').isEmail(),
body('password').isLength({min: 3, max: 35}),
registration
); 
router.post('/login', login); // /api/auth/login
router.post('/logout', logout); // /api/auth/logout
router.get('/refresh', refresh); // /api/auth/refresh
router.get('/users',authMiddleware, getUsers); // /api/auth/users

export default router;
