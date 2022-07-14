const ChapterModel = require("../model/chapter.model");
const CommentModel = require("../model/comment.model");
const MangaModel = require("../model/manga.model");

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
    const Chapter = await ChapterModel.findOne({ _id: req.params.id });
    const comments = await CommentModel.find({ chapterID: req.params.id });
    if (!Chapter) {
      res.json({ message: "chapter not found" });
      // } else if (!comments) {
      //   res.render("components/chapter/viewChapter", { Chapter, comments });
    } else {
      res.render("components/chapter/viewChapter", { Chapter, comments });
    }
  } catch (err) {
    res.json({ message: "loix" });
  }
};
