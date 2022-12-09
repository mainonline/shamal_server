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
            // const isRolesValid = () => {
            // if (roles && decoded.roles && roles.length && decoded.roles.length && roles.length >= decoded.roles.length) {
            //     let decodedRoles:string[] = [];
            //     decodedRoles = Array.from(decoded.roles)
            //     roles.map((role: string) => {return decodedRoles.includes(role)})
            // for (let i = 0; i < roles.length; i++) {
            //     decoded.roles.includes(roles[i])
            // }
            //     }
            // }
            if (decoded.role !== role) {
                return res.status(403).json({ message: "You are not allowed!" });
            }
            // console.log("\n");
            // console.log(decoded);
            // console.log("\n");
            next();
        }
        catch (error) {
            res.status(401).json({ message: "Not authorized" });
        }
    };
};
exports.roleCheck = roleCheck;
