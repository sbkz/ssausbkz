import mongoose from 'mongoose';
import Vacancy from '../models/vacancy.js';
import ApiError from '../exceptions/api-error.js';
//+
const getAllVacancies = async (req, res, next) => {
    try{
        const vacancies = await Vacancy.find();

        return res.json(vacancies);

    } catch (e){
        console.error("Ошибка при получении всех вакансии:", e); 
        next(ApiError.InternalServerError("Ошибка при получении всех вакансий", [e.message]));
    }

};

const getSingleVacancy = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(ApiError.BadRequest("Некорректный ID вакансии", []));
        }

        const vacancy = await Vacancy.findOne({_id: id}); 

        if (!vacancy) {
            return next(ApiError.NotFound("Вакансия не найдена", []));
        }

        return res.json(vacancy);

    } catch (e) {
        console.error("Ошибка при получении вакансии:", e); 
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return next(ApiError.BadRequest("Невалидный ID вакансии", []));
        }
        next(ApiError.InternalServerError("Ошибка при получении вакансии", [e.message]));

    }
};



export {
    getAllVacancies,
    getSingleVacancy
}