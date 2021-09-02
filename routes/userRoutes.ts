import { Router } from 'express'
import {
    addUser,
    deleteUserController,
    getAllUsers,
    getUserController,
    updateUserController
} from '../controllers/userController'

const router: Router = Router();

// router.post('/signup', authController.signup);
// router.post('/login', authController.login);

router
    .route('/')
    .get(getAllUsers)
    .post(addUser)

router
    .route('/:id')
    .get(getUserController)
    .patch(updateUserController)
    .delete(deleteUserController)

export default router;