const ReactionModel = require("../model/reaction.model");
const UserModel = require("../model/user.model");

//create a new reaction
module.exports.createReaction = async (req, res) => {
  try {
    const cookies = req.cookies;
    const user = await UserModel.findOne({ token: cookies.user });
    // console.log(user);
    if (user) {
      const reaction = await ReactionModel.create({
        commentID: req.body.commentID,
        userID: user.id,
      });
      // console.log(reaction);
    }
    res.json({
      message: "login success",
      status: 200,
      err: false,
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// delete reaction
module.exports.deleteReaction = async (req, res) => {
  try {
    const cookies = req.cookies;
    const user = await UserModel.findOne({ token: cookies.user });
    // console.log(user);
    if (user) {
      const followed = await ReactionModel.find({ _id: req.body.id });
      console.log(36, followed);
      // console.log(37, followed[0]);
      if (followed) {
        // console.log(38, followed[0].id);
        console.log(req.body.id);
        let a = await ReactionModel.deleteOne({ _id: req.body.id });
        console.log(a);
        // res.json({ message: "delete manga success" });
      } else {
        res.json({ message: "manga not found" });
      }
      res.json({
        message: "delete success",
        status: 200,
        err: false,
      });
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
