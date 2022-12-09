"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
const UserRole = index_1.default.define('user_role', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    roleId: sequelize_1.DataTypes.INTEGER,
    userId: sequelize_1.DataTypes.INTEGER
});
exports.default = UserRole;
