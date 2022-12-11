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
exports.deleteUser = exports.getOneUser = exports.getAllUsers = exports.updateUser = exports.createUser = exports.login = exports.registration = void 0;
const user_model_1 = __importDefault(require("../models/User/user.model"));
const api_error_1 = require("../error/api.error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const center_model_1 = __importDefault(require("../models/center.model"));
const role_model_1 = __importDefault(require("../models/User/role.model"));
const token_helper_1 = require("../helpers/token.helper");
const userRole_model_1 = __importDefault(require("../models/User/userRole.model"));
const validation_1 = require("../helpers/validation");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name, centerName, description, layout } = req.body;
        if (!email || !password) {
            return next(api_error_1.ApiError.badRequest('Please provide email and password'));
        }
        (0, validation_1.validatePassword)(password);
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
        let roleInfo = [];
        roleInfo.push(roleInsertData.name);
        const userRoleInsertData = {
            userId: user.id,
            roleId: role ? role.id : undefined,
            centerId: center.id
        };
        yield userRole_model_1.default.create(Object.assign({}, userRoleInsertData));
        const insertUserJwt = {
            id: user.id,
            email: user.email,
            roles: roleInfo,
            layout: layout,
            center: center.id
        };
        const insertUserJwtAccess = {
            email: user.email,
        };
        const refreshToken = (0, token_helper_1.generateRefreshToken)(insertUserJwt);
        const accessToken = (0, token_helper_1.generateAccessToken)(insertUserJwtAccess);
        return res.send({ accessToken, refreshToken });
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.registration = registration;
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
        let usersRoles = [];
        if (user.roles) {
            user.roles.map(roleName => {
                usersRoles.push(roleName.name);
            });
        }
        const insertUserJwt = {
            id: user.id,
            email: user.email,
            roles: user.roles ? usersRoles : [],
            layout: user.layout,
            center: user.centerId
        };
        const insertUserJwtAccess = {
            email: user.email,
        };
        const refreshToken = (0, token_helper_1.generateRefreshToken)(insertUserJwt);
        const accessToken = (0, token_helper_1.generateAccessToken)(insertUserJwtAccess);
        return res.send({ accessToken, refreshToken });
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.login = login;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password, roles } = req.body;
        if (!email || !password) {
            return next(api_error_1.ApiError.badRequest('Please  provide email and password'));
        }
        (0, validation_1.validatePassword)(password);
        const candidate = yield user_model_1.default.findOne({ where: { email } });
        if (candidate) {
            return next(api_error_1.ApiError.badRequest('UserModel with this email already exists'));
        }
        let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            return res.status(401).json({ message: "Not authorized" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_SECRET_KEY);
        const hashPassword = yield bcrypt_1.default.hash(password, 5);
        const userInsertData = {
            email: email,
            password: hashPassword,
            centerId: decoded.center
        };
        const user = yield user_model_1.default.create(Object.assign({}, userInsertData));
        if (roles) {
            yield Promise.all(roles.map((roleName) => __awaiter(void 0, void 0, void 0, function* () {
                yield role_model_1.default.findOrCreate({
                    where: { name: roleName, centerId: decoded.center },
                });
                const role = yield role_model_1.default.findOne({
                    where: { name: roleName, centerId: decoded.center }
                });
                yield userRole_model_1.default.create({
                    userId: user.id,
                    roleId: role ? role.id : undefined,
                    centerId: decoded.center
                });
            })));
        }
        return res.json(user);
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { name, email, password, img, phone, layout, roles } = req.body;
        const id = req.params.id;
        let token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token)
            return res.status(401).json({ message: "Not authorized" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_SECRET_KEY);
        (0, validation_1.validatePassword)(password);
        const hashPassword = yield bcrypt_1.default.hash(password, 5);
        const userUpdateData = {
            name: name,
            email: email,
            password: hashPassword,
            img: img,
            phone: phone,
            layout: layout,
        };
        const user = yield user_model_1.default.update(Object.assign({}, userUpdateData), { where: { id }, returning: true });
        if (roles) {
            yield Promise.all(roles.map((roleName) => __awaiter(void 0, void 0, void 0, function* () {
                yield role_model_1.default.findOrCreate({ where: { name: roleName, centerId: decoded.center } });
                const foundRole = yield role_model_1.default.findOne({ where: { name: roleName, centerId: decoded.center } });
                yield userRole_model_1.default.findOrCreate({
                    where: { userId: id, roleId: foundRole ? foundRole.id : undefined, centerId: decoded.center }
                });
            })));
        }
        const usersRoles = yield userRole_model_1.default.findAll({ where: { userId: id }, include: [role_model_1.default] });
        if (usersRoles) {
            yield Promise.all(usersRoles.map((singleRole) => __awaiter(void 0, void 0, void 0, function* () {
                if (!roles.includes(singleRole.role.name)) {
                    yield userRole_model_1.default.destroy({ where: { roleId: singleRole.roleId, userId: singleRole.userId } });
                }
            })));
        }
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
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const id = req.params.id;
        let token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[1];
        if (!token)
            return res.status(401).json({ message: "Not authorized" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_SECRET_KEY);
        if (decoded.id === parseInt(id)) {
            return next(api_error_1.ApiError.badRequest('Can not delete own account'));
        }
        const user = yield user_model_1.default.findOne({
            where: { id }
        });
        if (!user) {
            return next(api_error_1.ApiError.badRequest('User with this id not found'));
        }
        yield user_model_1.default.destroy({
            where: { id },
        });
        yield userRole_model_1.default.destroy({ where: { userId: id } });
        return res.status(200).json({ message: "deleted" });
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.deleteUser = deleteUser;
