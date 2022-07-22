const mongoose = require("./dbconnect");

const ReactionSchema = mongoose.Schema(
  {
    count: Number,
    userID: {
      type: String,
      ref: "user",
    },
    commentID: {
      type: String,
      ref: "comment",
    },
  },
  { collection: "reaction", timestamps: true }
);

const ReactionModel = mongoose.model("reaction", ReactionSchema);

module.exports = ReactionModel;
