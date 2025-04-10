
export default class ApiError extends Error {

    status;
    errors;

    constructor(status, message, errors = []){
        super(message);
        this.status = status;
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequest(message, errors){
        return new ApiError(400, message, errors);
    }

    static NotFound(message, errors = []) {
        return new ApiError(404, message, errors);
    }
    
    static InternalServerError(message = "Внутренняя ошибка сервера", errors = []) {
        return new ApiError(500, message, errors);
    }

    static Forbidden(message = "Нет доступа", errors = []) {
        return new ApiError(403, message, errors);
    }
}