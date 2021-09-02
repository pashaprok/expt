import { getRepository, Repository } from 'typeorm'
import { User } from '../entities/User'

export const getUsers = async (): Promise<Array<User>> => {
    const userRepository: Repository<User> = getRepository(User);
    return userRepository.find();
};

export const createUser = async (payload: User): Promise<User> => {
    const userRepository: Repository<User> = getRepository(User);
    const user: User = new User();
    return userRepository.save({
        ...user,
        ...payload,
    });
};

export const getUser = async (id: number): Promise<User | null> => {
    const userRepository: Repository<User> = getRepository(User);
    const user = await userRepository.findOne({ id: id });
    if (!user) return null;
    return user;
};

export const updateUser = async(id: number, upd: Partial<User>): Promise<User | null> => {
    const userRepository: Repository<User> = getRepository(User);
    await userRepository.update(id, upd);

    return getUser(id);
}

export const deleteUser = async (id: number): Promise<User | null> => {
    const userRepository: Repository<User> = getRepository(User);
    await userRepository.delete(id);
    return null;
};