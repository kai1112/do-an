const router = require("express").Router();
const controller = require("../controllers/libraryController");

router.post("/createLibrary", controller.createLibrary);
router.delete("/deleteLibrary", controller.deleteLibrary);

module.exports = router;
