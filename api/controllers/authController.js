import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/customError.js";
import validator from "validator";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    if (username === "" || email === "" || password === "") {
      next(errorHandler(400, false, "Please enter all details"));
    } else {
      if (validator.isEmail(email)) {
        await newUser.save();
        res.status(201).json({
          message: "User created successfully.",
        });
      } else {
        res.status(404).json({
          message: "Invalid email",
        });
      }
    }
  } catch (error) {
    next(errorHandler(500, false, "User already exists"));
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }
  const validUser = await User.findOne({ username });
  if (!validUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  const validPassword = bcrypt.compareSync(password, validUser._doc.password);

  if (validPassword) {
    const { password, ...userData } = validUser._doc;
    const jwt_token = jwt.sign({ id: userData._id }, process.env.JWT_TOKEN, {
      expiresIn: "15min",
    });

    res
      .cookie("access_token", jwt_token, {
        httpOnly: true,
        maxAge: 15 * 60 * 100,
      })
      .status(200)
      .json({
        success: true,
        message: "Valid user",
        userData,
      });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
};

export { signup, signin };
