"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
const center_model_1 = __importDefault(require("../center.model"));
const studentGroup_model_1 = __importDefault(require("./studentGroup.model"));
const group_model_1 = __importDefault(require("../Group/group.model"));
const Student = index_1.default.define('student', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    img: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    phone: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    layout: { type: sequelize_1.DataTypes.STRING, defaultValue: 'default' },
    userId: { type: sequelize_1.DataTypes.INTEGER },
    centerId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    createdAt: { type: sequelize_1.DataTypes.DATE },
    updatedAt: { type: sequelize_1.DataTypes.DATE }
});
center_model_1.default.hasMany(Student);
Student.belongsTo(center_model_1.default);
Student.hasMany(studentGroup_model_1.default);
studentGroup_model_1.default.belongsTo(Student);
group_model_1.default.hasMany(studentGroup_model_1.default);
studentGroup_model_1.default.belongsTo(group_model_1.default);
Student.belongsToMany(group_model_1.default, { through: studentGroup_model_1.default });
group_model_1.default.belongsToMany(Student, { through: studentGroup_model_1.default });
exports.default = Student;
