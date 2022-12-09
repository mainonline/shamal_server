import express from "express";
import userRoute from "./user.router";

const router = express.Router();

router.use("/user", userRoute);


export default router;