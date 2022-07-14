const router = require("express").Router();
const controller = require("../controllers/userController");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const arr = file.originalname.split(".");
    const ext = arr[arr.length - 1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${ext}`);
  },
});
const upload = multer({ storage: storage });

//using userController
router.post("/registers", controller.registers);
router.post("/login", controller.login);
router.get("/viewAllUsers", controller.viewAllUsers);
router.put("/:id/editUser", upload.single("avatar"), controller.editUser);

module.exports = router;
