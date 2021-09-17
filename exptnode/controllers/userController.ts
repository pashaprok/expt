import { Request, Response } from 'express'
import { User } from '../entities/User'
import {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
} from '../repositories/user'

import { getUserPosts } from '../repositories/post'

export async function getAllUsers(req: Request, res: Response) {
    const result: User[] = await getUsers();
    for (let i=0; i<result.length; i++) {
        result[i].posts = await getUserPosts(result[i].id)
    }

    return res.status(200).json({
        status: 'success',
        amountOfUsers: result.length,
        data: result,
    })
}

export async function getUserController(req: Request, res: Response) {
    const result: User = await getUser(+req.params.id);
    result.posts = await getUserPosts(+req.params.id);
    return res.status(200).json({
        status: 'success',
        data: result,
    });
}

export async function updateUserController(req: Request, res: Response) {
    const result: User = await updateUser(+req.params.id, req.body);

    return res.status(200).json({
        status: 'success',
        data: result,
    });
}

export async function deleteUserController(req: Request, res: Response) {
    await deleteUser(+req.params.id);
    return res.status(200).json({
        status: 'success'
    });
}
