"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
const center_model_1 = __importDefault(require("../center.model"));
const course_model_1 = __importDefault(require("./course.model"));
const grouptCourse_model_1 = __importDefault(require("./grouptCourse.model"));
const Group = index_1.default.define('group', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    color: { type: sequelize_1.DataTypes.STRING, defaultValue: 'red' },
    description: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    limit: { type: sequelize_1.DataTypes.STRING },
    centerId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    createdAt: { type: sequelize_1.DataTypes.DATE },
    updatedAt: { type: sequelize_1.DataTypes.DATE }
});
center_model_1.default.hasMany(Group);
Group.belongsTo(center_model_1.default);
Group.hasMany(grouptCourse_model_1.default);
grouptCourse_model_1.default.belongsTo(Group);
course_model_1.default.hasMany(grouptCourse_model_1.default);
grouptCourse_model_1.default.belongsTo(course_model_1.default);
Group.belongsToMany(course_model_1.default, { through: grouptCourse_model_1.default });
course_model_1.default.belongsToMany(Group, { through: grouptCourse_model_1.default });
exports.default = Group;
