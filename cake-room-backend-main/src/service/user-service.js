import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import UserModel from "../models/user.js";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from '../exceptions/api-error.js';



class UserService {
    async registration(email, password){
        try{
            const candidate = await UserModel.findOne({email})
            if(candidate){
                throw ApiError.BadRequest(`пользователь с почтовым адресом ${email} уже существует`, [])
            }
            const hashPassword = await bcrypt.hash(password, 10);

            const user = await UserModel.create({email, password: hashPassword, isActivated: true});
            
            const userDto = new UserDto(user)
            const tokens = tokenService.generateTokens({...userDto})
            await tokenService.saveToken(userDto.id, tokens.refreshToken)

            return {
                ...tokens,
                user: userDto
            }
        } catch (e){
            console.error("Ошибка при регистрации:", e);
            throw e;
        }
    }

    async login(email, password) {
        try{
            const user = await UserModel.findOne({email})
            if(!user){
                throw ApiError.BadRequest('Пользователь с таким email не найден', [])
            }
            const isPassEquals = await bcrypt.compare(password, user.password);
            if(!isPassEquals) {
                throw ApiError.BadRequest('Неверный пароль', [])
            }
            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken)

            return {
                ...tokens,
                user: userDto
            }
        } catch(e){
            console.error("Ошибка при входе:", e);
            throw e;
        }
    }

    async logout(refreshToken) {
        try{
            const token = await tokenService.removeToken(refreshToken);
            return token;
        } catch(e){
            console.error("Ошибка при выходе:", e);
            throw e;
        }
    }

    async refresh(refreshToken) {
        try{
            if(!refreshToken) {
                throw ApiError.UnauthorizedError()
            }
            
            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = await tokenService.findToken(refreshToken);

            if(!userData || !tokenFromDb) {
                throw ApiError.UnauthorizedError()
            }
            
            const user = await UserModel.findById(userData.id)
            if(!user){
                throw ApiError.UnauthorizedError()
            }
            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({...userDto});

            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            return {...tokens, user: userDto}
        } catch(e){
            console.error("Ошибка при обновлении токена:", e);
            throw e;
        }
    }

    async getAllUsers() {
        try{
        const users = await UserModel.find()
        return users
        } catch(e){
            console.error("Ошибка при получении всех пользователей:", e);
            throw e;
        }
    }
}
export default new UserService()