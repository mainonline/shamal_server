"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
const center_model_1 = __importDefault(require("../center.model"));
const group_model_1 = __importDefault(require("../Group/group.model"));
const teacher_model_1 = __importDefault(require("../Teacher/teacher.model"));
const teacherGroup_model_1 = __importDefault(require("../Teacher/teacherGroup.model"));
const StudentGroup = index_1.default.define('student_group', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    centerId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    studentId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    groupId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    createdAt: { type: sequelize_1.DataTypes.DATE },
    updatedAt: { type: sequelize_1.DataTypes.DATE }
});
center_model_1.default.hasMany(StudentGroup);
StudentGroup.belongsTo(center_model_1.default);
teacher_model_1.default.hasMany(teacherGroup_model_1.default);
teacherGroup_model_1.default.belongsTo(teacher_model_1.default);
group_model_1.default.hasMany(teacherGroup_model_1.default);
teacherGroup_model_1.default.belongsTo(group_model_1.default);
teacher_model_1.default.belongsToMany(group_model_1.default, { through: teacherGroup_model_1.default });
group_model_1.default.belongsToMany(teacher_model_1.default, { through: teacherGroup_model_1.default });
exports.default = StudentGroup;
