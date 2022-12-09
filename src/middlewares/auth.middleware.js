"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheck = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authCheck = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        let token;
        if (req.headers.authorization)
            token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" });
        }
        const jwtPayload = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        res.locals.jwtPayload = jwtPayload;
        res.locals.username = jwtPayload["email"];
        next();
    }
    catch (e) {
        res.status(401).json({ message: "Не авторизован catch" });
    }
};
exports.authCheck = authCheck;
