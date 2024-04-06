import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found !"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Credentials are wrong!"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.SECRET_KEY);
    const { password: pswrd, ...rest } = validUser._doc;
    res
      .cookie("Token:", token, {
        maxAge: 60 * 60 * 1000,
      })
      .status(201)
      .json({
        rest,
      });
  } catch (err) {
    next(err);
    res.status(404).json({
      success: false,
      message: "Error:Unable to sign in",
    });
  }
};

export { signup, signin };
