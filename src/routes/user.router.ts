import express from "express";
const router = express.Router();
import {createUser, getAllUsers, getOneUser, login, registration, updateUser} from "../controllers/user.controller"
import {roleCheck} from "../middlewares/role.middleware";

router.post('/register', registration);
router.post('/login', login);
router.post('/', roleCheck(process.env.ADMIN_ROLE as string), createUser);
router.get('/', roleCheck(process.env.ADMIN_ROLE as string), getAllUsers);
router.get('/:id', roleCheck(process.env.ADMIN_ROLE as string), getOneUser);
router.put('/:id', roleCheck(process.env.ADMIN_ROLE as string), updateUser);
router.patch('/:id', roleCheck(process.env.ADMIN_ROLE as string), updateUser);
// router.get('/register', roleCheck(process.env.ADMIN_ROLE as string), registration);

export default router;