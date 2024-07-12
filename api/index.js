import express from "express";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import { errorCheck } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(cookieParser());

// Connect DB

connectDB();

// Use of express router
app.use("/api/user", userRouter, errorCheck);
app.use("/api/auth", authRouter, errorCheck);

app.listen(PORT, () => {
  console.log(`Server started at Port: ${PORT}`);
});
