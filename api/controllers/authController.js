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

const signin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (username === "" || password === "") {
      return res.status(400).json({
        success: false,
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
      const jwt_token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, {
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
          message: "Sign in successful",
          userData,
        });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...userData } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 15 * 60 * 100,
        })
        .status(200)
        .json({
          success: true,
          message: "Sign in successful",
          userData,
        });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const generatedUsername =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.floor(Math.random() * 10000).toString();
      const newUser = new User({
        username: generatedUsername,
        email: req.body.email,
        password: hashedPassword,
        userPhoto: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...userData } = newUser._doc;
      res
        .cookie("access-token", token, {
          httpOnly: true,
          maxAge: 15 * 60 * 100,
        })
        .status(201)
        .json({
          success: true,
          message: "User created successful",
          userData,
        });
    }
  } catch (error) {
    next(errorHandler(error));
  }
};

const signout = async (req, res) => {
  if (!req.cookies.access_token) {
    return res.status(404).json({
      success: true,
      message: "Already signed out, Login Again!",
    });
  }
  res.clearCookie("access_token").status(200).json({
    success: true,
    message: "Sign out successfully",
  });
};

export { signup, signin, google, signout };
