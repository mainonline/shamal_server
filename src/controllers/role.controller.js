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
exports.deleteRole = exports.getRole = exports.getAllRoles = exports.updateRole = exports.createRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const role_model_1 = __importDefault(require("../models/User/role.model"));
const userRole_model_1 = __importDefault(require("../models/User/userRole.model"));
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name } = req.body;
        let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            return res.status(401).json({ message: "Not authorized" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_SECRET_KEY);
        const roleInsertData = {
            name: name,
            centerId: decoded.center
        };
        const role = yield role_model_1.default.create(Object.assign({}, roleInsertData));
        return res.json(role);
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.createRole = createRole;
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { name } = req.body;
        const id = req.params.id;
        let token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token)
            return res.status(401).json({ message: "Not authorized" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_SECRET_KEY);
        const foundSameRole = yield role_model_1.default.findOne({ where: { name: name } });
        if (foundSameRole) {
            return res.status(404).json({ message: "The role with provided name already exist" });
        }
        const roleUpdateData = {
            name: name,
            centerId: decoded.center
        };
        const role = yield role_model_1.default.update(Object.assign({}, roleUpdateData), { where: { id }, returning: true });
        return res.json(role);
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.updateRole = updateRole;
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        let token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[1];
        if (!token)
            return res.status(401).json({ message: "Not authorized" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_SECRET_KEY);
        const roles = yield role_model_1.default.findAll({ where: { centerId: decoded.center } });
        return res.json(roles);
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.getAllRoles = getAllRoles;
const getRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const id = req.params.id;
        let token = (_d = req.headers.authorization) === null || _d === void 0 ? void 0 : _d.split(' ')[1];
        if (!token)
            return res.status(401).json({ message: "Not authorized" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_SECRET_KEY);
        const role = yield role_model_1.default.findOne({ where: { id: id, centerId: decoded.center } });
        return res.json(role);
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.getRole = getRole;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const id = req.params.id;
        let token = (_e = req.headers.authorization) === null || _e === void 0 ? void 0 : _e.split(' ')[1];
        if (!token)
            return res.status(401).json({ message: "Not authorized" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_SECRET_KEY);
        yield role_model_1.default.destroy({ where: { id: id, centerId: decoded.center } });
        yield userRole_model_1.default.destroy({ where: { roleId: id, centerId: decoded.center } });
        return res.status(200).json({ message: "deleted" });
    }
    catch (e) {
        return res.status(404).json(e.message);
    }
});
exports.deleteRole = deleteRole;
