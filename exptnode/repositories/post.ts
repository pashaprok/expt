import {DeleteResult, getRepository, Repository} from 'typeorm'
import { Post } from '../entities/Post'

export const getPosts = async (): Promise<Array<Post>> => {
    const postRepository: Repository<Post> = getRepository(Post);
    return postRepository.find({
        relations: ['userID']
    });
};

export const createPost = async (payload: Partial<Post>): Promise<Post> => {
    const postRepository: Repository<Post> = getRepository(Post);
    const post: Post = new Post();
    return postRepository.save({
        ...post,
        ...payload,
    });
};

export const getPost = async (id: number): Promise< Post > => {
    const postRepository: Repository<Post> = getRepository(Post);
    return await postRepository.findOneOrFail({
        where: {
            id
        },
        relations: ['userID']
    });
};

export const getUserPosts = async (id: number): Promise<Array<Post>> => {
    const postRepository: Repository<Post> = getRepository(Post);
    return postRepository.find({
        where: {
            userID: id
        }
    });
};

export const updatePost = async(id: number, upd: Partial<Post>): Promise<Post> => {
    const postRepository: Repository<Post> = getRepository(Post);
    await postRepository.update(id, upd);
    return getPost(id);
}

export const deletePost = async (id: number): Promise<DeleteResult> => {
    const postRepository: Repository<Post> = getRepository(Post);
    return await postRepository.delete(id);
};