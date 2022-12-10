"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.generateRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.REFRESH_SECRET_KEY, {
        expiresIn: '24h',
    });
};
exports.generateRefreshToken = generateRefreshToken;
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.ACCESS_SECRET_KEY, {
        expiresIn: '1h',
    });
};
exports.generateAccessToken = generateAccessToken;
