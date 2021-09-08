import { Request, Response } from 'express'
import {deleteCity, getCities, getCity, getCityByName} from '../repositories/city'
import { City } from "../entities/City"

export async function getAllCities(req: Request, res: Response) {
    const result: City[] = await getCities();
    return res.status(200).json({
        status: 'success',
        data: result,
    })
}

export async function getCityController(req, res) {
    let result: City;
    let c  = req.params.city;
    if (!isNaN(+c)) {
        result = await getCity(+c);
    } else if(isNaN(+c)) {
        result = await getCityByName(c);
    }

    if (!result) res.status(404).send({ message: "No city found" });
    return res.status(200).json({
        status: 'success',
        data: result,
    });
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

