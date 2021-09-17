import { Router } from 'express'
import {
    addPost,
    deletePostController,
    getAllPosts,
    getPostController,
    updatePostController
} from '../controllers/postController'
import passport from "../controllers/authController";

const router: Router = Router();

router
    .route('/')
    .get(getAllPosts)
    .post(passport.authenticate('jwt'), addPost)

router
    .route('/:id')
    .get(getPostController)
    .patch(passport.authenticate('jwt'), updatePostController)
    .delete(passport.authenticate('jwt'), deletePostController)

export default router;