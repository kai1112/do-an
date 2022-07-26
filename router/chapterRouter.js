const router = require("express").Router();
const controller = require("../controllers/chapterController");

// using chapterController
router.get("/:id/viewChapter", controller.getChapter);
// pagination chapter
router.get("/:id/paginationChapter", controller.paginationChapter);
//create chapter
router.post("/:id/createChapter", controller.createChapter);
router.get("/:id/createChapter", controller.viewCreateChapter);
// edit chapter
router.post("/:id/editChapter", controller.editChapter);
router.get("/:id/editChapter", controller.viewEditchapter);
//deleteChapter
router.delete("/:id/deleteChapter", controller.deleteChapter);
// create reaction
router.post("/createReaction", controller.createReaction);
// router.delete("/deleteReaction", controller.deleteReaction);
module.exports = router;
