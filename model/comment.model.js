const mongoose = require("./dbconnect");

const CommentSchema = mongoose.Schema(
  {
    title: String,
    reply: String,
    like: Number,
    userID: {
      type: String,
      ref: "user",
    },
    chapterID: {
      type: String,
      ref: "chapter",
    },
  },
  { collection: "Comment", timestamps: true }
);

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
