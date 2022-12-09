import * as dotenv from "dotenv";
import {Options} from "sequelize";
import path from "path";

dotenv.config({ path: path.join(__dirname, '../../.env') });

interface ConfigTs {
    development: Options;
}

declare const process : {
    env: {
        DB_NAME: string,
        DB_USER: string,
        DB_PASSWORD: string,
        DB_HOST: string,
        DB_PORT: number,
    }
}


const configDB: ConfigTs = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "postgres",
        dialectOptions: {
            charset: "utf8",
        },
        define: {
            timestamps: false,
        },
    }
};
export default configDB;