import express from'express';

import {
    getAllVacancies,
    getSingleVacancy,
} from '../controllers/vacancy-controller.js';

const router = express.Router();

router.get('/', getAllVacancies); // /api/vacancies
router.get('/:id', getSingleVacancy); // /api/vacancies/:id

export default router;
