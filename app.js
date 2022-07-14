const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

require("dotenv").config();

// const cookieParser = require("cookie-parser");
const router = require("./router/index");

app.set("view engine", "ejs");
// app.set("views", "views");

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/", router);
app.listen(process.env.PORT || "4000", () => {
  console.log("Server is running");
});
