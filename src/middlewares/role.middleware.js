"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleCheck = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const roleCheck = (role) => {
    return function (req, res, next) {
        var _a;
        if (req.method === "OPTIONS")
            next();
        try {
            let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token)
                return res.status(401).json({ message: "Not authorized" });
            const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_SECRET_KEY);
            if (!decoded.roles.includes(process.env.SUPER_ADMIN_ROLE)) {
                if ((role === process.env.SUPER_ADMIN_ROLE && !decoded.roles.includes(process.env.SUPER_ADMIN_ROLE)) ||
                    (role === process.env.ADMIN_ROLE && !decoded.roles.includes(process.env.ADMIN_ROLE)) ||
                    (role === process.env.MANAGER_ROLE && !decoded.roles.includes(process.env.MANAGER_ROLE)) ||
                    (role === process.env.TEACHER_ROLE && !decoded.roles.includes(process.env.TEACHER_ROLE)) ||
                    (role === process.env.STUDENT_ROLE && !decoded.roles.includes(process.env.STUDENT_ROLE))) {
                    return res.status(403).json({ message: "You are not allowed!" });
                }
            }
            next();
        }
        catch (error) {
            res.status(401).json({ message: "Not authorized!" });
        }
    };
};
exports.roleCheck = roleCheck;
