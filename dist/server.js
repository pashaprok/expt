"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: `${__dirname}/config.env` });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
const PORT = +process.env.PORT || 3000;
(0, typeorm_1.createConnection)().then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`app running on port ${PORT}...`);
    });
}).catch(error => console.log(error));
//# sourceMappingURL=server.js.map