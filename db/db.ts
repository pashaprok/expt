import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DBUSER,
    password: process.env.DBUSERPASS,
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    database: process.env.DBNAME
})

export default pool;