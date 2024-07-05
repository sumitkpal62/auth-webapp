import express from "express";
import { registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/getdata", registerUser)

export default userRouter;