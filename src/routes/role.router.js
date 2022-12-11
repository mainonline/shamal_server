"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const role_middleware_1 = require("../middlewares/role.middleware");
const role_controller_1 = require("../controllers/role.controller");
router.post('/', (0, role_middleware_1.roleCheck)(process.env.ADMIN_ROLE), role_controller_1.createRole);
router.get('/', (0, role_middleware_1.roleCheck)(process.env.ADMIN_ROLE), role_controller_1.getAllRoles);
router.get('/:id', (0, role_middleware_1.roleCheck)(process.env.ADMIN_ROLE), role_controller_1.getRole);
router.put('/:id', (0, role_middleware_1.roleCheck)(process.env.ADMIN_ROLE), role_controller_1.updateRole);
router.patch('/:id', (0, role_middleware_1.roleCheck)(process.env.ADMIN_ROLE), role_controller_1.updateRole);
router.delete('/:id', (0, role_middleware_1.roleCheck)(process.env.ADMIN_ROLE), role_controller_1.deleteRole);
exports.default = router;
