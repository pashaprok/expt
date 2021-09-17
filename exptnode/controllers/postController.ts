import { Request, Response } from 'express'
import { Post } from '../entities/Post'
import {
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost, getUserPosts,
} from '../repositories/post'
import {Forbidden, NotFound, Unauthorized} from "http-errors";
import { checkBelongs } from "../utils/checkBelongs";

export async function getAllPosts(req: Request, res: Response) {
    const result: Post[] = await getPosts();
    return res.status(200).json({
        status: 'success',
        data: result,
    })
}

export async function addPost(req: Request, res: Response) {
    if(!req.user) {
        throw new Unauthorized('You are unauthorized!')
    } else {
        const newPost: Partial<Post> = req.body;
        newPost.posted = new Date()
        newPost.userID = +req.user.id
        const response: Post = await createPost(newPost);

        return res.status(200).json({
            status: 'success',
            data: response,
        })
    }

}

export async function getPostController(req: Request, res: Response) {
    const result: Post | null = await getPost(+req.params.id);
    if (!result) {
        return res.status(404).send({message: "No post found"})
    } else {
        return res.status(200).json({
            status: 'success',
            data: result,
        });
    }
}

export async function updatePostController(req: Request, res: Response) {
    if(!req.user) {
        throw new Unauthorized('You are unauthorized!')
    } else {
        const post: Post | null = await getPost(+req.params.id)
        const userPosts: Post[] = await getUserPosts(req.user.id)

        const check: boolean = checkBelongs(userPosts, post.id)

        if(check) {
            const result: Post | null = await updatePost(+req.params.id, req.body);
            return res.status(200).json({
                status: 'success',
                data: result,
            });
        } else {
            throw new Forbidden('Only the author can edit the post')
        }
    }
}

export async function deletePostController(req: Request, res: Response) {
    if(!req.user) {
        throw new Unauthorized('You are unauthorized!');
    } else {
        const post: Post | null = await getPost(+req.params.id)
        const userPosts: Post[] = await getUserPosts(req.user.id)

        const check: boolean = checkBelongs(userPosts, post.id)
        if(check) {
            await deletePost(+req.params.id);
            return res.status(200).json({
                status: 'success'
            });
        } else {
            throw new Forbidden('Only the author can delete the post')
        }
    }
}