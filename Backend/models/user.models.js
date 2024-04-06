import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE-gJjLwamn6t5WFghZ_rsC-iYmgy7oOnboRXjgNgyVA&s",
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
