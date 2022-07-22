const mongoose = require("./dbconnect");

const RentMangaSchema = mongoose.Schema(
  {
    deadline: Date,
    userID: {
      type: String,
      ref: "user",
    },
    mangaID: {
      type: String,
      ref: "manga",
    },
  },
  { collection: "RentManga" }
);

const RentMangaModel = mongoose.model("RentManga", RentMangaSchema);

module.exports = RentMangaModel;
