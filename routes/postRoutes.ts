import { Router } from 'express'
import {
    addPost,
    deletePostController,
    getAllPosts,
    getPostController,
    updatePostController
} from '../controllers/postController'

const router: Router = Router();

router
    .route('/')
    .get(getAllPosts)
    .post(addPost)

router
    .route('/:id')
    .get(getPostController)
    .patch(updatePostController)
    .delete(deletePostController)

export default router;