import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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
const app = express();

app.listen(process.env.PORT || 6000, () => {
  console.log(`Listening at Port: ${process.env.PORT || 6000}`);
});

//import router

import userRouter from "./routes/user.routes.js";
app.use("/api/user", userRouter);
