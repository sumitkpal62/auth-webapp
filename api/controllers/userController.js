import User from "../models/userModel.js";
import { errorHandler } from "../utils/customError.js";
import bcrypt from "bcrypt";

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
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

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, false, "You can delete only your profile."));
  }
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({
      success: true,
      message: "Account is deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export { deleteUser, updateUser };
