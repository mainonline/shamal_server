"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.registration = void 0;
const user_model_1 = __importDefault(require("../models/User/user.model"));
const api_error_1 = require("../error/api.error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const center_model_1 = __importDefault(require("../models/center.model"));
const role_model_1 = __importDefault(require("../models/User/role.model"));
const generateJwt_1 = __importDefault(require("../middlewares/generateJwt"));
const userRole_model_1 = __importDefault(require("../models/User/userRole.model"));
const registration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name, centerName, description, layout } = req.body;
        if (!email || !password) {
            return next(api_error_1.ApiError.badRequest('Please provide email and password'));
        }
        const candidate = yield user_model_1.default.findOne({ where: { email } });
        if (candidate) {
            return next(api_error_1.ApiError.badRequest('UserModel with this email already exists'));
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 5);
        const userInsertData = {
            name: name,
            email: email,
            password: hashPassword,
        };
        const user = yield user_model_1.default.create(Object.assign({}, userInsertData));
        const centerInsertData = {
            name: centerName,
            description: description,
            userId: user.id
        };
        const center = yield center_model_1.default.create(Object.assign({}, centerInsertData));
        const roleInsertData = {
            name: process.env.SUPER_ADMIN_ROLE,
            centerId: center.id
        };
        const role = yield role_model_1.default.findOrCreate({
            where: Object.assign({}, roleInsertData),
        });
        const insertUserJwt = { id: user.id, email: user.email, role: roleInsertData.name, layout: layout };
        const token = (0, generateJwt_1.default)(insertUserJwt);
        return res.json(token);
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.registration = registration;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.findAll({
            include: { model: userRole_model_1.default }
        });
        return res.json(users);
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.getAllUsers = getAllUsers;
