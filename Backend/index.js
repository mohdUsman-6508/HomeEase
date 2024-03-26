import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

//middlewares

app.use(express.json());

//connect to mongodb
dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "HomeEase",
  })
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

//listen server

app.listen(process.env.PORT || 6000, () => {
  console.log(`Listening at Port: ${process.env.PORT || 6000}`);
});

//import router

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
