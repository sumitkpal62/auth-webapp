import express from "express";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import { userCheck } from "./middlewares/authMiddleware.js";

const PORT = 4000;
const app = express();

app.use(express.json());

// Connect DB

connectDB();

// Use of express router
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter, userCheck);

app.listen(PORT, () => {
  console.log(`Server started at Port: ${PORT}`);
});
