import express from "express";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import { errorCheck } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";
import path from "path";

const PORT = 4000;
const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "client", "dist")));

app.use(express.json());
app.use(cookieParser());

// Connect DB

connectDB();

// Use of express router
app.use("/api/user", userRouter, errorCheck);
app.use("/api/auth", authRouter, errorCheck);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started at Port: ${PORT}`);
});
