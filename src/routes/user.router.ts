import express from "express";
const router = express.Router();
import {getAllUsers, registration} from "../controllers/user.controller"
import {roleCheck} from "../middlewares/role.middleware";

router.post('/register', registration);
router.get('/', roleCheck([process.env.ADMIN_ROLE as string, process.env.TEACHER_ROLE as string]), getAllUsers);
// router.get('/register', roleCheck(process.env.ADMIN_ROLE as string), registration);

export default router;