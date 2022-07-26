const router = require("express").Router();
const controller = require("../controllers/mangaController");
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
// create manga
router.post("/createManga", upload.single("avatar"), controller.createManga);
router.get("/createManga", controller.viewCreateManga);

//view all manga
router.get("/viewAllManga", controller.viewAllManga);
router.get("/:id/viewDetails", controller.viewDetails);
// view pagination
router.get("/viewManga", controller.pagination);
// editManga
router.post("/:id/editManga", controller.editManga);
router.get("/:id/editManga", controller.viewEditManga);
// ddelete manga
router.delete("/:id/deleteManga", controller.deleteManga);

module.exports = router;
