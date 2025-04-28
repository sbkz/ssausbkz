import mongoose from "mongoose";

const VacancySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    conditions:{
        type: Array,
        required: true,
    },
    duties:{
        type: Array,
        required: true,
    },
    requirements:{
        type: Array,
        required: true,
    },
    salary:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        required:true
    }
});

const Vacancy = mongoose.model('Vacancy',VacancySchema);

export default Vacancy