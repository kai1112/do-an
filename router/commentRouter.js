const router = require("express").Router();
const controller = require("../controllers/commentController");

router.get("/createComment", controller.viewCreateComment);
router.post("/createComment", controller.createComment);
module.exports = router;
