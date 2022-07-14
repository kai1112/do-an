const router = require("express").Router();
const controller = require("../controllers/userController");


// using  user router
const userRoute = require("./userRouter");
router.use("/user", userRoute);
router.get("/login", controller.showLogin);
router.get("/registers", controller.showRegisters);

// using manga router
const mangaRoute = require("./mangaRouter");
router.use("/manga", mangaRoute);

// using chapter router
const chapterRoute = require("./chapterRouter");
router.use("/chapter", chapterRoute);

// using library
const libraryRoute = require("./libraryRouter");
router.use("/library", libraryRoute);

// using comment router
const commentRoute = require("./commentRouter");
router.use("/comment", commentRoute);

module.exports = router;
