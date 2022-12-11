"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
const center_model_1 = __importDefault(require("../center.model"));
const CourseType = index_1.default.define('course_type', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    color: { type: sequelize_1.DataTypes.STRING, defaultValue: 'blue' },
    centerId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    createdAt: { type: sequelize_1.DataTypes.DATE },
    updatedAt: { type: sequelize_1.DataTypes.DATE }
});
center_model_1.default.hasMany(CourseType);
CourseType.belongsTo(center_model_1.default);
exports.default = CourseType;
