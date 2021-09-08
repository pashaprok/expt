import 'reflect-metadata'
import 'express-async-errors'
import { createConnection } from 'typeorm'
import { appConfig } from './config/app'

import app from './app'

createConnection().then(() => {
    app.listen(appConfig.port, () => {
        console.log(`app running on port ${appConfig.port}...`);
    });
}).catch(error => console.log(error));