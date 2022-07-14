const CommentModel = require("../model/comment.model");
const UserModel = require("../model/user.model");

//view create comments
module.exports.viewCreateComment = async (req, res, next) => {
  try {
    res.render("components/comment/createComment");
  } catch (err) {}
};
// create comment
module.exports.createComment = async (req, res) => {
  try {
    const cookies = req.cookies;
    const user = await UserModel.findOne({ token: cookies.user });
    console.log(req.params.id);
    console.log(user);
    if (user) {
      const comment = await CommentModel.create({
        userID: user.id,
        chapterID: req.body.chapterId,
        title: req.body.comment,
      });
      console.log(comment);
    }
    res.json({
      message: "login success",
      status: 200,
      err: false,
    });
  } catch (err) {}
};
