const ChapterModel = require("../model/chapter.model");
const CommentModel = require("../model/comment.model");
const MangaModel = require("../model/manga.model");
const UserModel = require("../model/user.model");
const paginationChapter = require("../service/paginationChapter");
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
  res.render("pages/chapter/createChapter/createChapter");
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
  res.render("pages/chapter/editChapter/editChapter");
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
    paginationChapter(req, res);
    let Chapter = await paginationChapter(req, res);
    // console.log(Chapter.Chapter);
    const listChapter = await ChapterModel.find({
      MangaID: Chapter.Chapter.MangaID,
    }).limit(1);
    // console.log(73, listChapter);
    const list = await ChapterModel.find({
      MangaID: Chapter.Chapter.MangaID,
    });
    let total = await ChapterModel.count();

    if (!Chapter) {
      res.json({ message: "chapter not found" });
    } else {
      res.render("pages/chapter/viewChapter/viewChapter", {
        list,
        listChapter,
        total: Math.ceil(total / 1),
        comments: Chapter.comments,
        users: Chapter.users,
        user: Chapter.user,
        reactions: Chapter.reactions,
      });
    }
  } catch (err) {
    res.json({ message: "loix" });
  }
};
// pagination chapter page
module.exports.paginationChapter = async (req, res) => {
  try {
    paginationChapter(req, res);
    let Chapter = await paginationChapter(req, res);

    const comments = await CommentModel.find({
      chapterID: Chapter.Chapter._id,
    });

    const listChapter = await ChapterModel.find({
      MangaID: Chapter.Chapter.MangaID,
    })
      .skip(req.query.limit * (req.query.page - 1))
      .limit(req.query.limit);
    // console.log(116, listChapter);
    res.render("pages/chapter/viewChapter/paginationChapter", {
      listChapter: listChapter,
      comments,
      users: Chapter.users,
      user: Chapter.user,
      reactions: Chapter.reactions,
    });
  } catch (err) {
    console.log(err);
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
        } else {
          let reaction1 = reactions.filter((reaction) => {
            return reaction === user.id;
          });
          // console.log(135, reaction1);
          // console.log(137, user.id);
          if (reaction1[0] !== user.id) {
            reactions.push(user.id);
            const update1Comment = await CommentModel.updateOne(
              { _id: req.body.commentID },
              {
                reaction: reactions,
              }
            );
          } else {
            reactions = reactions.filter((reaction) => reaction !== user.id);
            const update1Comment = await CommentModel.updateOne(
              { _id: req.body.commentID },
              {
                reaction: reactions,
              }
            );
          }
        }
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
