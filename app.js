const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const realtime = require("./socket");

const app = express();
// cài đặt socket io
const httpServer = createServer(app);
const io = new Server(httpServer, {});
// hàm realtime của socket io
realtime(io);

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

// điều hướng router
app.use("/", router);

httpServer.listen(process.env.PORT || "4000", () => {
  console.log("Server is running");
});
