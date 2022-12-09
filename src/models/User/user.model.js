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
const User = index_1.default.define('user', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: true,
            isEmail: true
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            containsSpecialChar(value) {
                const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                const uppercaseChars = /[A-Z]/;
                const lowercaseChars = /[a-z]/;
                const numericChars = /\d/;
                if (value.length < 8) {
                    throw new Error('length of password more than 8');
                }
                if (!lowercaseChars.test(value)) {
                    throw new Error('should contain lowercase char');
                }
                if (!uppercaseChars.test(value)) {
                    throw new Error('should contain uppercase char');
                }
                if (!numericChars.test(value)) {
                    throw new Error('should contain numeric char');
                }
                if (!specialChars.test(value)) {
                    throw new Error('should contain special char');
                }
            },
        }
    },
    name: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    img: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    phone: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    layout: { type: sequelize_1.DataTypes.STRING, defaultValue: 'default' },
    centerId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false }
});
center_model_1.default.hasMany(User);
User.belongsTo(center_model_1.default);
User.hasMany(userRole_model_1.default);
userRole_model_1.default.belongsTo(User);
User.belongsToMany(role_model_1.default, { through: userRole_model_1.default });
role_model_1.default.belongsToMany(User, { through: userRole_model_1.default });
exports.default = User;
