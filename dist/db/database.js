"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = require("../models/post");
const config = {
    type: "postgres",
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    username: process.env.DBUSER,
    password: process.env.DBUSERPASS,
    database: process.env.DBNAME,
    entities: [post_1.Post],
    synchronize: true,
};
exports.default = config;
//# sourceMappingURL=database.js.map