const mongoose = require("./dbconnect");

const MangaSchema = mongoose.Schema(
  {
    avatar: String,
    category: [String],
    name: String,
    author: String,
    description: String,
    views: Number,
    like: Number,
    price: Number,
  },
  { collection: "Manga", timestamps: true }
);

const MangaModel = mongoose.model("Manga", MangaSchema);

module.exports = MangaModel;
