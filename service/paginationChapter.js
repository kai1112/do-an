const ChapterModel = require("../model/chapter.model");
const CommentModel = require("../model/comment.model");

const UserModel = require("../model/user.model");

async function paginationChapter(req, res) {
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
    return {
      Chapter,
      comments,
      users,
      user,
      reactions,
    };
  } catch (error) {
    console.log("loi");
  }
}

module.exports = paginationChapter;
