import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error.js';
import userService from '../service/user-service.js';
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;
//+

const registration = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return next(ApiError.BadRequest('Пароль > 3 символов, и почта формата example@mail.com' ,errors.array()))
        }
        const {email, password} = req.body;
        const userData = await userService.registration(email, password);

        res.cookie('refreshToken', userData.refreshToken, {maxAge: COOKIE_MAX_AGE, httpOnly: true}) 
        
        return res.status(201).json(userData)
    } catch(e) {
        console.error("Ошибка при регистрации:", e);
        next(e)
    }
};

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const userData = await userService.login(email, password);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: COOKIE_MAX_AGE, httpOnly: true  }) 
        
        return res.json(userData)
    } catch(e) {
        console.error("Ошибка при входе в систему:", e);
        next(e);
    }
};

const logout = async (req, res, next) => {
    try {   
        const {refreshToken} = req.cookies;
        if (!refreshToken) {
            return res.status(204).end();
        }
        await userService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.status(204).end(); // Возвращаем 204 No Content после успешного выхода

    } catch(e) {
        console.error("Ошибка при выходе из системы:", e);
        next(e);
    }
};

const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return next(ApiError.UnauthorizedError()); // Если нет refreshToken - Unauthorized
        }
    
        const userData = await userService.refresh(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: COOKIE_MAX_AGE, httpOnly: true  })
        return res.json(userData)
    } catch (e) {
        console.error("Ошибка при обновлении токена:", e);
        next(e)
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers()
        return res.json(users)
    } catch(e) {
        console.error("Ошибка при получении списка пользователей:", e);
        next(e);
    }
};

export {
    registration,
    login,
    logout,
    refresh,
    getUsers
}