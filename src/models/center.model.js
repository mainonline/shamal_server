"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const Center = index_1.default.define('center', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, defaultValue: 'ADMINISTRATOR', allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    userId: sequelize_1.DataTypes.INTEGER
});
exports.default = Center;
