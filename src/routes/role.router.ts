import express from "express";
const router = express.Router();
import {roleCheck} from "../middlewares/role.middleware";
import {createRole, deleteRole, getAllRoles, getRole, updateRole} from "../controllers/role.controller";


router.post('/', roleCheck(process.env.ADMIN_ROLE as string), createRole);
router.get('/', roleCheck(process.env.ADMIN_ROLE as string), getAllRoles);
router.get('/:id', roleCheck(process.env.ADMIN_ROLE as string), getRole);
router.put('/:id', roleCheck(process.env.ADMIN_ROLE as string), updateRole);
router.patch('/:id', roleCheck(process.env.ADMIN_ROLE as string), updateRole);
router.delete('/:id', roleCheck(process.env.ADMIN_ROLE as string), deleteRole);

export default router;