import {Router} from "express";
import * as postController from "../controllers/postController";

const router: Router = Router();

router
    .route('/')
    .get(postController.getAllPosts)
    .post(postController.createPost);

router
    .route('/:id')
    .get(postController.getPost)
    .patch(postController.updatePost)
    .delete(postController.deletePost);

export default router;