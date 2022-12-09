import * as dotenv from "dotenv";
import {Sequelize} from "sequelize";
import path from "path";

dotenv.config({ path: path.join(__dirname, '../../.env') });

declare const process : {
    env: {
        DB_NAME: string,
        DB_USER: string,
        DB_PASSWORD: string,
        DB_HOST: string,
        DB_PORT: number,
    }
}

console.log(process.env.DB_NAME)

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432
    }
)