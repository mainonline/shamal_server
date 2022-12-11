"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./user.router"));
const role_router_1 = __importDefault(require("./role.router"));
const router = express_1.default.Router();
router.use("/user", user_router_1.default);
router.use("/role", role_router_1.default);
exports.default = router;
