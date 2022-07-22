const ChapterModel = require("../model/chapter.model");
const CommentModel = require("../model/comment.model");
const MangaModel = require("../model/manga.model");
const UserModel = require("../model/user.model");
// create new chapter
module.exports.createChapter = async (req, res) => {
  try {
    const chapter = await MangaModel.findOne({ mangaID: req.params.id });
    if (!chapter) {
      res.json({ chapter: chapter });
    } else {
      await ChapterModel.create({
        mangaID: req.params.id,
        title: req.body.title,
        content: req.body.content,
        views: 0,
      });
    }
    res.json({
      message: "login success",
      status: 200,
      err: false,
    });
  } catch (err) {
    res.json({ message: "loi" });
  }
};
// view chapter create
module.exports.viewCreateChapter = async (req, res) => {
  res.render("components/chapter/createChapter");
};

// edit chapter
module.exports.editChapter = async (req, res) => {
  try {
    const chapter = await ChapterModel.findById(req.params.id);
    if (!chapter) {
      res.json({ message: "Chapter not found" });
    } else {
      await ChapterModel.updateOne(req.body);
      res.json({ message: "Chapter update successfully" });
    }
  } catch (err) {
    res.json({ err });
  }
};
module.exports.viewEditchapter = async (req, res) => {
  res.render("components/chapter/editChapter");
};
// delete chapter
module.exports.deleteChapter = async (req, res) => {
  // console.log(req.params.id);
  try {
    const chapter = await ChapterModel.findOne({ _id: req.params.id });
    if (chapter) {
      await ChapterModel.findByIdAndDelete(chapter._id);
      res.json({ message: "delete chapter successfully" });
    } else {
      res.json({ message: "Chapter not found" });
    }
  } catch (err) {
    res.json(err);
  }
};
// view all chapter
module.exports.getChapter = async (req, res) => {
  try {
    // lấy thông tin người dùng
    const cookies = req.cookies;
    const user = await UserModel.findOne({ token: cookies.user });
    // tạo biến chapter lấy thông tin từ data base thông qua id
    const Chapter = await ChapterModel.findOne({ _id: req.params.id });
    // tạo biến comments để tìm kiếm thông tin của comment thông qua chapter id
    const comments = await CommentModel.find({ chapterID: req.params.id });

    const users = [];
    // const reactionNumber = [];

    for (let i = 0; i < comments.length; i++) {
      // console.log(comments[i].userID);
      const user = await UserModel.findOne({ _id: comments[i].userID });
      users.push(user);
    }
    // console.log(comments);
    let reactions = [];
    comments.map((comment) => {
      comment.reaction.map((reaction) => {
        if (reaction == user.id) reactions.push(reaction);
      });
    });
    // console.log(reactions);

    if (!Chapter) {
      res.json({ message: "chapter not found" });
    } else {
      res.render("components/chapter/viewChapter", {
        Chapter,
        comments,
        users,
        user,
        reactions,
      });
    }
  } catch (err) {
    res.json({ message: "loix" });
  }
};

//create a new reaction
module.exports.createReaction = async (req, res) => {
  try {
    const cookies = req.cookies;
    const user = await UserModel.findOne({ token: cookies.user });
    // console.log(user);
    const comments = await CommentModel.find({ _id: req.body.commentID });
    // console.log(comments);
    if (user) {
      comments.map(async (comment) => {
        // console.log(comment);
        let reactions = comment.reaction;
        if (reactions == "") {
          reactions.push(user.id);
          // console.log(151, reactions);
          const update1Comment = await CommentModel.updateOne(
            { _id: req.body.commentID },
            {
              reaction: reactions,
            }
          );
          // console.log(159, update1Comment);
        } else {
          let reaction1 = reactions.filter((reaction) => {
            return reaction === user.id;
          });
          console.log(135, reaction1);
          console.log(reaction1[0] !== user.id);
          console.log(137, user.id);
          if (reaction1[0] !== user.id) {
            reactions.push(user.id);
            const update1Comment = await CommentModel.updateOne(
              { _id: req.body.commentID },
              {
                reaction: reactions,
              }
            );
            console.log(144, reaction1);
          } else {
            console.log(147, reactions);
            console.log(148, reactions[0] == user.id);
            // for (let i = 0; i < reactions.length; i++) {
            //   if (reactions[i] == user.id) {
            //     reactions = reactions.splice(i, 1);
            //     console.log(152, reactions);
            //   }
            // }
            reactions = reactions.filter((reaction) => reaction !== user.id);
            console.log(152, reactions);
            const update1Comment = await CommentModel.updateOne(
              { _id: req.body.commentID },
              {
                reaction: reactions,
              }
            );
            console.log(156, reaction1);
          }

          // if (reaction != user.id) {
        }
        // reactions.map((reaction) => {
        //   console.log(151, reaction);
        // });
      });
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
