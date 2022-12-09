"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
const userRole_model_1 = __importDefault(require("./userRole.model"));
const Role = index_1.default.define('role', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    centerId: sequelize_1.DataTypes.INTEGER
});
Role.hasMany(userRole_model_1.default);
userRole_model_1.default.belongsTo(Role);
exports.default = Role;