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
exports.getOneUser = exports.getAllUsers = exports.updateUser = exports.login = exports.createUser = exports.registration = void 0;
const user_model_1 = __importDefault(require("../models/User/user.model"));
const api_error_1 = require("../error/api.error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const center_model_1 = __importDefault(require("../models/center.model"));
const role_model_1 = __importDefault(require("../models/User/role.model"));
const generateJwt_1 = __importDefault(require("../middlewares/generateJwt"));
const userRole_model_1 = __importDefault(require("../models/User/userRole.model"));
const validation_1 = require("../helpers/validation");
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
        const centerInsertData = {
            name: centerName,
            description: description,
        };
        const center = yield center_model_1.default.create(Object.assign({}, centerInsertData));
        const hashPassword = yield bcrypt_1.default.hash(password, 5);
        const userInsertData = {
            name: name,
            email: email,
            password: hashPassword,
            centerId: center.id
        };
        const user = yield user_model_1.default.create(Object.assign({}, userInsertData));
        const roleInsertData = {
            name: process.env.SUPER_ADMIN_ROLE,
            centerId: center.id
        };
        yield role_model_1.default.findOrCreate({
            where: Object.assign({}, roleInsertData),
        });
        const role = yield role_model_1.default.findOne({
            where: Object.assign({}, roleInsertData)
        });
        const userRoleInsertData = {
            userId: user.id,
            roleId: role ? role.id : undefined,
            centerId: center.id
        };
        yield userRole_model_1.default.create(Object.assign({}, userRoleInsertData));
        const insertUserJwt = {
            id: user.id,
            email: user.email,
            role: roleInsertData.name,
            layout: layout,
            center: center.id
        };
        const token = (0, generateJwt_1.default)(insertUserJwt);
        return res.json(token);
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.registration = registration;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, centerId } = req.body;
        if (!email || !password) {
            return next(api_error_1.ApiError.badRequest('Please  provide email and password'));
        }
        const candidate = yield user_model_1.default.findOne({ where: { email } });
        if (candidate) {
            return next(api_error_1.ApiError.badRequest('UserModel with this email already exists'));
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 5);
        const userInsertData = {
            email: email,
            password: hashPassword,
            centerId: centerId
        };
        const user = yield user_model_1.default.create(Object.assign({}, userInsertData));
        return res.json(user);
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.createUser = createUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({
            where: { email },
            include: { model: role_model_1.default }
        });
        if (!user) {
            return next(api_error_1.ApiError.internal('User with this email not found'));
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return next(api_error_1.ApiError.internal('Not valid password'));
        }
        const insertUserJwt = {
            id: user.id,
            email: user.email,
            role: user.roles ? user.roles[0].name : "",
            layout: user.layout,
            center: user.centerId
        };
        const token = (0, generateJwt_1.default)(insertUserJwt);
        return res.json(token);
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.login = login;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, img, phone, layout } = req.body;
        const id = req.params.id;
        (0, validation_1.validatePassword)(password);
        const hashPassword = yield bcrypt_1.default.hash(password, 5);
        const userUpdateData = {
            name: name,
            email: email,
            password: hashPassword,
            img: img,
            phone: phone,
            layout: layout
        };
        const user = yield user_model_1.default.update(Object.assign({}, userUpdateData), { where: { id }, returning: true });
        return res.json(user);
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.updateUser = updateUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.findAll({
            include: { model: role_model_1.default },
            attributes: {
                exclude: ['password']
            }
        });
        return res.json(users);
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const users = yield user_model_1.default.findOne({
            where: { id },
            include: { model: role_model_1.default },
            attributes: {
                exclude: ['password']
            }
        });
        return res.json(users);
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.getOneUser = getOneUser;
