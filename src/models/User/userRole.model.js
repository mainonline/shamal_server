"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
const center_model_1 = __importDefault(require("../center.model"));
const UserRole = index_1.default.define('user_role', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    roleId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    userId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    centerId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false }
});
center_model_1.default.hasMany(UserRole);
UserRole.belongsTo(center_model_1.default);
exports.default = UserRole;
