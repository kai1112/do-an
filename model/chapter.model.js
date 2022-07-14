const mongoose = require("./dbconnect");

const ChapterSchema = mongoose.Schema(
  {
    Chap: Number,
    title: String,
    content: String,
    views: Number,
    mangaID: {
      type: String,
      ref: "Manga",
    },
  },
  { collection: "Chapter", timestamps: true }
);
const ChapterModel = mongoose.model("Chapter", ChapterSchema);

module.exports = ChapterModel;
