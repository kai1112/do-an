const router = require("express").Router();
const controller = require("../controllers/reactionController");

router.post("/createReaction", controller.createReaction);
router.delete("/deleteReaction", controller.deleteReaction);

module.exports = router;
