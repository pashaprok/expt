import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { City } from "../entities/City";
import { decompressFromUrl } from '../utils/decompressFile'

export default class importCitiesSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const address: string = 'http://bulk.openweathermap.org/sample/city.list.json.gz';
        let list = await decompressFromUrl(address);

        const cities: City[] = list.map(city => {
            city.latcoord = city.coord.lat;
            city.loncoord = city.coord.lon;
            delete city.coord;
            return city;
        })

        for (let i = 0; i < cities.length; i += 10000) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(City)
                .values(cities.slice(i, i + 10000))
                .execute()
        }
    }
}