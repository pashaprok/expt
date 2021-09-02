require('dotenv').config({ path: `${__dirname}/config.env` });

const dbConfig = {
    type: "postgres",
    host: process.env.DBHOST,
    port: +process.env.DBPORT,
    username: process.env.DBUSER,
    password: process.env.DBUSERPASS,
    database: process.env.DBNAME,
    synchronize: false,
    logging: false,
    entities: [
        "entities/**/*.ts"
    ],
    migrations: [
        "migration/**/*.ts"
    ],
    subscribers: [
        "subscriber/**/*.ts"
    ],
    cli: {
    entitiesDir: "entities",
        migrationsDir: "migration",
        subscribersDir: "subscriber"
    }
}

export default dbConfig;