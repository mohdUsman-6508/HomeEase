import express from "express";

const app = express();

app.listen(4000, () => {
  console.log("Listening at Port: 4000");
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Working....",
  });
});
