const router = require("express").Router();
const controller = require("../controllers/libraryController");

router.get("/allLibraries", controller.viewAllLibrary);
router.get("/:id/viewLibrary", controller.viewLibrary);

module.exports = router;
