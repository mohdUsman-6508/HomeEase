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
      .cookie("accessToken", token, {
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

const generateToken = async (user) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
  const { password: pswrd, ...rest } = user._doc;
  console.log(rest);
  return { token, rest };
};
//
const google = async (req, res, next) => {
  //CHECK USER EXIST OR NOT
  // IF USER EXIST ->
  ///MAKE TOKEN AND SEND COOKIE TO CLIENT
  // IF USER NOT EXIST ->
  ///MAKE NEW USER ,GENERATE RANDOM PASSWORD
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const { token, rest } = await generateToken(user);
      return res
        .status(200)
        .cookie("accessToken", token, { httpOnly: true, secure: true })
        .json(rest);
    } else {
      const generateRandomPassword = Math.random().toString(36).slice(-10);
      const hashedPassword = bcryptjs.hashSync(generateRandomPassword, 10);
      const userName =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);
      const createUser = new User({
        username: userName,
        email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await createUser.save();
      const { token, rest } = await generateToken(user);
      return res
        .status(200)
        .cookie("accessToken", token, { httpOnly: true, secure: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export { signup, signin, google };
