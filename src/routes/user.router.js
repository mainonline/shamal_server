"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = require("../controllers/user.controller");
const role_middleware_1 = require("../middlewares/role.middleware");
router.post('/register', user_controller_1.registration);
router.get('/', (0, role_middleware_1.roleCheck)([process.env.ADMIN_ROLE, process.env.TEACHER_ROLE]), user_controller_1.getAllUsers);
// router.get('/register', roleCheck(process.env.ADMIN_ROLE as string), registration);
exports.default = router;
