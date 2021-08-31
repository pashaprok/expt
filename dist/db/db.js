"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: process.env.DBUSER,
    password: process.env.DBUSERPASS,
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    database: process.env.DBNAME
});
exports.default = pool;
//# sourceMappingURL=db.js.map