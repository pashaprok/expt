import {Request, Response} from 'express'
import {weatherConfig} from '../config/weather'
import axios, {AxiosResponse} from 'axios'

export async function getWeather(req: Request, res: Response) {
    const response: AxiosResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
            id: req.user.cityID.id,
            appid: weatherConfig.api_key,
        }
    })

    return res.json(response.data);
}