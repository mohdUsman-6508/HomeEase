import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const __dirname = path.resolve();

//middlewares
app.use(express.json());
app.use(cookieParser());
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
import listingRouter from "./routes/listing.routes.js";
//http:localhost:4000/api/

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
//

app.use(express.static(path.join(__dirname, "/Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

//middleware for handling api error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!!!";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
