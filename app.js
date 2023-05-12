var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

var indexRouter = require("./routes/index");

async function connectDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/odinbook");
}
connectDb().catch((err) => console.log(err));

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3001" }));

app.use("/", indexRouter);

module.exports = app;
