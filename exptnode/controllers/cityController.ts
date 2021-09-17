import { Request, Response } from 'express'
import {deleteCity, getCities, getCity, getCityByName} from '../repositories/city'
import { City } from "../entities/City"
import {UnprocessableEntity} from "http-errors";

export async function getAllCities(req: Request, res: Response) {
    const result: City[] = await getCities();
    return res.status(200).json({
        status: 'success',
        data: result,
    })
}

export async function getCityController(req: Request, res: Response) {
    let city: City;
    let c  = req.params.city;
    if (!isNaN(+c)) {
        city = await getCity(+c);
        return res.status(200).json({
            status: 'success',
            data: city,
        });
    } else if(isNaN(+c)) {
        city = await getCityByName(c);
        return res.status(200).json({
            status: 'success',
            data: city,
        });
    }

}

export async function deleteAllCities(req: Request, res: Response) {
    const cities = await getCities();
    for(let i=0; i<cities.length; i++) {
        await deleteCity(cities[i].id)
    }

    return res.status(200).json({
        status: 'success',
    });
}

export async function deleteCityController(req: Request, res: Response) {
    let c  = req.params.city;
    if (!isNaN(+c)) {
        await deleteCity(+c);
        return res.status(200).json({
            status: 'success'
        });
    } else if(isNaN(+c)) {
        throw new UnprocessableEntity('Incorrect city id!')
    }
}
