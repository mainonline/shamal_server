import express from "express";
import userRoute from "./user.router";
import roleRoute from "./role.router";

const router = express.Router();

router.use("/user", userRoute);
router.use("/role", roleRoute);

export default router;