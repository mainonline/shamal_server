"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
const center_model_1 = __importDefault(require("../center.model"));
const role_model_1 = __importDefault(require("./role.model"));
const userRole_model_1 = __importDefault(require("./userRole.model"));
const manager_model_1 = __importDefault(require("../Manager/manager.model"));
const student_model_1 = __importDefault(require("../Student/student.model"));
const teacher_model_1 = __importDefault(require("../Teacher/teacher.model"));
const lead_model_1 = __importDefault(require("../lead.model"));
const User = index_1.default.define('user', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: true,
            isEmail: true,
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    name: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    img: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    phone: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    layout: { type: sequelize_1.DataTypes.STRING, defaultValue: 'default' },
    centerId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    createdAt: { type: sequelize_1.DataTypes.DATE },
    updatedAt: { type: sequelize_1.DataTypes.DATE }
});
center_model_1.default.hasMany(User);
User.belongsTo(center_model_1.default);
User.hasMany(userRole_model_1.default);
userRole_model_1.default.belongsTo(User);
User.hasMany(manager_model_1.default);
manager_model_1.default.belongsTo(User);
User.hasMany(teacher_model_1.default);
teacher_model_1.default.belongsTo(User);
User.hasMany(student_model_1.default);
student_model_1.default.belongsTo(User);
User.hasMany(lead_model_1.default);
lead_model_1.default.belongsTo(User);
User.belongsToMany(role_model_1.default, { through: userRole_model_1.default });
role_model_1.default.belongsToMany(User, { through: userRole_model_1.default });
exports.default = User;
