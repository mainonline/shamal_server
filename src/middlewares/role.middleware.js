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
            const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            if (decoded.role !== process.env.SUPER_ADMIN_ROLE) {
                if (role === process.env.SUPER_ADMIN_ROLE && decoded.role !== process.env.SUPER_ADMIN_ROLE) {
                    return res.status(403).json({ message: "Only for super admin allowed!" });
                }
                if (role === process.env.ADMIN_ROLE &&
                    (decoded.role !== process.env.ADMIN_ROLE ||
                        decoded.role !== process.env.SUPER_ADMIN_ROLE)) {
                    return res.status(403).json({ message: "Only for admin allowed!" });
                }
                if (role === process.env.MANAGER_ROLE &&
                    (decoded.role !== process.env.MANAGER_ROLE ||
                        decoded.role !== process.env.ADMIN_ROLE ||
                        decoded.role !== process.env.SUPER_ADMIN_ROLE)) {
                    return res.status(403).json({ message: "Only for admin and manager allowed!" });
                }
                if (role === process.env.TEACHER_ROLE &&
                    (decoded.role === process.env.TEACHER_ROLE ||
                        decoded.role !== process.env.MANAGER_ROLE ||
                        decoded.role !== process.env.ADMIN_ROLE ||
                        decoded.role !== process.env.SUPER_ADMIN_ROLE)) {
                    console.log("\n");
                    console.log("TRUE TEACHER IF");
                    console.log("\n");
                    return res.status(403).json({ message: "Only for admin, manager and teacher allowed!" });
                }
                if (role === process.env.STUDENT_ROLE &&
                    (decoded.role !== process.env.STUDENT_ROLE ||
                        decoded.role !== process.env.TEACHER_ROLE ||
                        decoded.role !== process.env.MANAGER_ROLE ||
                        decoded.role !== process.env.ADMIN_ROLE ||
                        decoded.role !== process.env.SUPER_ADMIN_ROLE)) {
                    return res.status(403).json({ message: "Only for admin, manager, teacher and student allowed!" });
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
