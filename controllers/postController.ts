import { Request, Response } from 'express';
import db from '../db/db'
import {QueryResult} from "pg";

interface Post {
    title: string
    content: string,
    posted?: Date,
    author?: string
}


export async function getAllPosts(req: Request, res: Response) {
    const posts: QueryResult = await db.query('SELECT * FROM post;');

    return res.status(200).json({
        status: 'success',
        results: posts.rows.length,
        data: {
            data: posts.rows,
        },
    });
}

export async function createPost(req: Request, res: Response) {
    const p: Post = req.body
    p.posted = new Date()

    let newPost: QueryResult;

    if(p.author) {
        newPost = await db.query(
            'INSERT INTO post (title, content, posted, author) values ($1, $2, $3, $4) returning id;',
            [p.title, p.content, p.posted, p.author]
        )
    } else {
        newPost = await db.query(
            'INSERT INTO post (title, content, posted) values ($1, $2, $3) returning id;',
            [p.title, p.content, p.posted]
        )
    }

    const post: QueryResult = await db.query('SELECT * FROM post WHERE id = $1;', [newPost.rows[0].id])
    const [ data ] = post.rows;

    return res.status(200).json({
        status: 'success',
        data: {
            data,
        },
    })
}

export async function getPost(req: Request, res: Response) {
    const id = req.params.id as string
    const post: QueryResult = await db.query('SELECT * FROM post WHERE ID = $1;', [id]);
    const data: Post = post.rows[0]

    return res.status(200).json({
        status: 'success',
        data: {
            data,
        },
    });
}

export async function updatePost(req: Request, res: Response) {
    const id = req.params.id as string
    const p: Post = req.body

    await db.query(
        'UPDATE post SET title=$1, content=$2 WHERE ID=$3;',
        [p.title, p.content, id]
    )

    const post: QueryResult = await db.query('SELECT * FROM post WHERE id = $1;', [id])
    const data: Post = post.rows[0]

    return res.status(200).json({
        status: 'success',
        data: {
            data,
        },
    })
}

export async function deletePost(req: Request, res: Response) {
    const id = req.params.id as string
    await db.query('DELETE FROM post WHERE ID = $1;', [id]);

    return res.status(200).json({
        status: 'success',
    });
}