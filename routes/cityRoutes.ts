import { Router } from 'express'
import {
    deleteAllCities,
    getAllCities,
    getCityController,
} from '../controllers/cityController'
import passport from "../controllers/authController";

const router: Router = Router();

router
    .route('/')
    .get(getAllCities)
    .delete(passport.authenticate('jwt'), deleteAllCities)

router
    .route('/:city')
    .get(getCityController)

export default router;