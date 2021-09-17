import { Router } from 'express'
import {
    deleteAllCities, deleteCityController,
    getAllCities,
    getCityController,
} from '../controllers/cityController'
import passport from "../controllers/authController";

const router: Router = Router();

router
    .route('/')
    .get(getAllCities)
    .delete(deleteAllCities) // passport.authenticate('jwt'),

router
    .route('/:city')
    .get(getCityController)
    .delete(deleteCityController)

export default router;