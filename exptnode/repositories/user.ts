import {DeleteResult, getRepository, Repository} from 'typeorm'
import {User} from '../entities/User'

export const getUsers = async (): Promise<User[]> => {
    const userRepository: Repository<User> = getRepository(User);
    return userRepository.find();
};

export const createUser = async (payload: Partial<User>): Promise<User> => {
    const userRepository: Repository<User> = getRepository(User);
    const user: User = new User();
    return userRepository.save({
        ...user,
        ...payload,
    });
};

export const getUser = async (id: number): Promise<User> => {
    const userRepository: Repository<User> = getRepository(User);
    return await userRepository.findOneOrFail({
        where: {
            id
        },
        relations: ['posts', 'cityID']
    })
};

export const getUserByEmail = async (email: string): Promise<User> => {
    const userRepository: Repository<User> = getRepository(User);
    return await userRepository.findOneOrFail({
        where: {
            email
        },
    });
};

export const updateUser = async (id: number, upd: Partial<User>): Promise<User> => {
    const userRepository: Repository<User> = getRepository(User);
    await userRepository.update(id, upd);
    return await getUser(id);
}

export const deleteUser = async (id: number): Promise<DeleteResult> => {
    const userRepository: Repository<User> = getRepository(User);
    return await userRepository.delete(id);
};