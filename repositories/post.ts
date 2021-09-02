import { getRepository, Repository } from 'typeorm'
import { Post } from '../entities/Post'
import { validate } from 'class-validator'

export const getPosts = async (): Promise<Array<Post>> => {
    const postRepository: Repository<Post> = getRepository(Post);
    return postRepository.find();
};

export const createPost = async (payload: Post): Promise<Post> => {
    const postRepository: Repository<Post> = getRepository(Post);
    const post: Post = new Post();
    return postRepository.save({
        ...post,
        ...payload,
    });
};

export const getPost = async (id: number): Promise<Post | null> => {
    const postRepository: Repository<Post> = getRepository(Post);
    const post = await postRepository.findOne({ id: id });
    if (!post) return null;
    return post;
};

export const getUserPosts = async (id: number): Promise<Array<Post>> => {
    const postRepository: Repository<Post> = getRepository(Post);
    return postRepository.find({
        where: {
            userID: id
        }
    });
};

export const updatePost = async(id: number, upd: Partial<Post>): Promise<Post | null> => {
    const postRepository: Repository<Post> = getRepository(Post);
    await postRepository.update(id, upd);

    return getPost(id);
}

export const deletePost = async (id: number): Promise<Post | null> => {
    const postRepository: Repository<Post> = getRepository(Post);
    await postRepository.delete(id);
    return null;
};