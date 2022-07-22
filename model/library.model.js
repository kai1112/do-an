const mongoose = require("./dbconnect");

const LibrarySchema = mongoose.Schema(
  {
    status: String,
    userID: {
      type: String,
      ref: "user",
    },
    MangaID: {
      type: String,
      ref: "manga",
    },
  },
  { collection: "Library" }
);

const LibraryModel = mongoose.model("Library", LibrarySchema);

module.exports = LibraryModel;
