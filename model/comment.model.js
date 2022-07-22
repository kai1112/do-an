const mongoose = require("./dbconnect");

const CommentSchema = mongoose.Schema(
  {
    title: String,
    userID: {
      type: String,
      ref: "user",
    },
    chapterID: {
      type: String,
      ref: "chapter",
    },
    reaction: [String],
  },
  { collection: "Comment", timestamps: true }
);

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
