import User from "../models/userModel.js";
import { errorHandler } from "../utils/customError.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  res.json({
    message: "The user is registered successfully.",
  });
};

const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    // return res.status(400).json("3rd point");

    return next(errorHandler(401, false, "You can update only your account!"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          userPhoto: req.body.profilePhoto,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({
      success: true,
      message: "User data updated successful",
      userData: rest,
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser, updateUser };
