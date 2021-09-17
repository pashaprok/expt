import {DeleteResult, getRepository, Repository} from 'typeorm'
import { City } from '../entities/City'
import { Post } from "../entities/Post";

export const addCity = async (payload: Partial<City>): Promise<City> => {
    const cityRepository: Repository<City> = getRepository(City);
    const city: City = new City();
    return cityRepository.save({
        ...city,
        ...payload,
    });
};

export const getCities = async (): Promise<City[]> => {
    const cityRepository: Repository<City> = getRepository(City);
    return cityRepository.find();
};

export const getCity = async (id: number): Promise<City> => {
    const cityRepository: Repository<City> = getRepository(City);
    return cityRepository.findOneOrFail({ id: id });
};

export const getCityByName = async (name: string): Promise<City> => {
    const cityRepository: Repository<City> = getRepository(City);
    return cityRepository.findOneOrFail({where: {name}});
};

export const deleteCity = async (id: number): Promise<DeleteResult> => {
    const cityRepository: Repository<City> = getRepository(City);
    return await cityRepository.delete(id);
};