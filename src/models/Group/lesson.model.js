"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
const center_model_1 = __importDefault(require("../center.model"));
const Lesson = index_1.default.define('lesson', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    color: { type: sequelize_1.DataTypes.STRING, defaultValue: 'blue' },
    topic: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    status: { type: sequelize_1.DataTypes.STRING, defaultValue: 'pending' },
    startTime: { type: sequelize_1.DataTypes.TIME },
    endTime: { type: sequelize_1.DataTypes.TIME },
    duration: { type: sequelize_1.DataTypes.INTEGER },
    courseId: { type: sequelize_1.DataTypes.INTEGER },
    centerId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    createdAt: { type: sequelize_1.DataTypes.DATE },
    updatedAt: { type: sequelize_1.DataTypes.DATE }
});
center_model_1.default.hasMany(Lesson);
Lesson.belongsTo(center_model_1.default);
exports.default = Lesson;
