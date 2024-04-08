import User from "../models/user.models.js";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";

const user = async (req, res) => {
  res.json({
    success: true,
    message: "welcome user!",
  });
};

const updateUser = async (req, res, next) => {
  //algorithm--->

  try {
    const id = req.params?.id;
    const { username, email, password, avatar } = req.body;

    if (req.user.id !== id) {
      return next(errorHandler(401, "unauthenticated!"));
    }

    if (req.body?.password) {
      req.body.password = bcryptjs.hashSync(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { username, email, password: req.body?.password, avatar },
      },
      { new: true }
    );

    const { password: pass, ...rest } = updatedUser._doc;
    res.status(201).json({
      rest,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export { user, updateUser };
