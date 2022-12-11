"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
const center_model_1 = __importDefault(require("../center.model"));
const TeacherGroup = index_1.default.define('teacher_group', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    centerId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    studentId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    groupId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    createdAt: { type: sequelize_1.DataTypes.DATE },
    updatedAt: { type: sequelize_1.DataTypes.DATE }
});
center_model_1.default.hasMany(TeacherGroup);
TeacherGroup.belongsTo(center_model_1.default);
exports.default = TeacherGroup;
