import {createConnection} from "typeorm"
import * as fs from "fs";
import {addCity, deleteCity, getCities} from "../../repositories/city";

createConnection().then(async () => {
    console.log('database connected...')


    async function deleteData() {
        const cities = await getCities();
        for(let i = 0; i<cities.length; i++) {
            await deleteCity(cities[i].id)
        }
    }

    async function importData() {
        const cities = JSON.parse(fs.readFileSync(`${__dirname}/city.list.json`, 'utf-8'));

        cities.map(city => {
            city.loncoord = city.coord.lon
            city.latcoord = city.coord.lat
            delete city.coord
        })

        for(let i = 0; i<cities.length; i++) {
            await addCity(cities[i])
        }
    }

    if (process.argv[2] === '--import') {
        await importData();
    } else if (process.argv[2] === '--delete') {
        await deleteData();
    }

    process.exit();
}).catch(error => console.log(error));


// ts-node ./dev-data/cities/importCities.ts --delete