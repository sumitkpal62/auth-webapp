import express from "express";
import { updateUser, deleteUser } from "../controllers/userController.js";
import verifyToken from "../middlewares/userMiddleware.js";

const userRouter = express.Router();

userRouter.post("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);

export default userRouter;
