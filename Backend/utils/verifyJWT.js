import User from "../models/user.models.js";
import errorHandler from "./error.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) return next(errorHandler(401, "Unauthorized access!"));
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const validUser = await User.findById(
      decodedToken?.id || decodedToken?._id
    );
    // console.log("validUser", validUser._id);

    if (!validUser) return next(errorHandler(401, "Invalid Token!"));
    req.user = validUser;
    next();
  } catch (error) {
    return next(errorHandler(401, error.message));
  }
};

export { verifyJWT };
