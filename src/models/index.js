"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const env = process.env.NODE_ENV || "development";
const config = database_config_1.default[env];
let db = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.default = db;
