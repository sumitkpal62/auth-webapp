import express from "express";
import { registerUser, updateUser } from "../controllers/userController.js";
import verifyToken from "../middlewares/userMiddleware.js";

const userRouter = express.Router();

userRouter.get("/getdata", registerUser);
userRouter.post("/update/:id", verifyToken, updateUser);

export default userRouter;
