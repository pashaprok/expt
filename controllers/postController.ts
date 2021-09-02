import { Request, Response } from 'express'
import { Post } from '../entities/Post'
import {
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost,
} from '../repositories/post'

export async function getAllPosts(req: Request, res: Response) {
    const result: Post[] = await getPosts();
    return res.status(200).json({
        status: 'success',
        data: result,
    })
}



export async function addPost(req: Request, res: Response) {
    const newPost: Post = req.body;
    newPost.posted = new Date()
    const response: Post = await createPost(newPost);

    return res.status(200).json({
        status: 'success',
        data: response,
    })
}

export async function getPostController(req: Request, res: Response) {
    const result: Post = await getPost(+req.params.id);
    if (!result) res.status(404).send({ message: "No post found" });
    return res.status(200).json({
        status: 'success',
        data: result,
    });
}

export async function updatePostController(req: Request, res: Response) {
    const result: Post = await updatePost(+req.params.id, req.body);
    if (!result) res.status(404).send({ message: "No post found" });
    return res.status(200).json({
        status: 'success',
        data: result,
    });
}

export async function deletePostController(req: Request, res: Response) {
    await deletePost(+req.params.id);
    return res.status(200).json({
        status: 'success'
    });
}