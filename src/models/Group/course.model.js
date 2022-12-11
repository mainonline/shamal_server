"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
const center_model_1 = __importDefault(require("../center.model"));
const courseType_model_1 = __importDefault(require("./courseType.model"));
const lesson_model_1 = __importDefault(require("./lesson.model"));
const Course = index_1.default.define('course', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    color: { type: sequelize_1.DataTypes.STRING, defaultValue: 'blue' },
    description: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    duration: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 90 },
    start: { type: sequelize_1.DataTypes.DATE, defaultValue: Date.now() },
    end: { type: sequelize_1.DataTypes.DATE },
    weekDays: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING) },
    typeId: { type: sequelize_1.DataTypes.INTEGER },
    centerId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    createdAt: { type: sequelize_1.DataTypes.DATE },
    updatedAt: { type: sequelize_1.DataTypes.DATE }
});
center_model_1.default.hasMany(Course);
Course.belongsTo(center_model_1.default);
courseType_model_1.default.hasMany(Course);
Course.belongsTo(courseType_model_1.default);
Course.hasMany(lesson_model_1.default);
lesson_model_1.default.belongsTo(Course);
exports.default = Course;
