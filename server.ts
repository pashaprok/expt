require('dotenv').config({ path: `${__dirname}/config.env` });
import 'reflect-metadata'
import { createConnection } from 'typeorm'

import app from './app'

const PORT: number = +process.env.PORT || 3000;

createConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`app running on port ${PORT}...`);
    });
}).catch(error => console.log(error));