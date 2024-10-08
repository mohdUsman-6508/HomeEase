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

const deleteUser = async (req, res, next) => {
  try {
    const idParams = req.params?.id;
    const objectId = req.user?._id;
    const idUser = objectId.toString();

    if (idParams !== idUser) {
      return res.status(401).json({
        success: false,
        message: "wrong id!",
      });
    }

    const deletedUser = await User.findByIdAndDelete(idUser);
    res.status(201).clearCookie("accessToken").json({
      deletedUser,
    });

    console.log("deleted", deletedUser);
  } catch (error) {
    next(error);
  }
};

const getUserDetail = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json(errorHandler(404, "User not found!"));
    }

    res.status(200).json(user);
  } catch (error) {
    res.json({ message: error });
  }
};

export { user, updateUser, deleteUser, getUserDetail };
