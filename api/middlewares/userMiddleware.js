import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/customError.js";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, false, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, false, "Token is not valid!"));
    }
    req.user = user;
    next();
  });
};

export default verifyToken;
