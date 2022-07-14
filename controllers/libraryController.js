const LibraryModel = require("../model/library.model");

// view all library
module.exports.viewAllLibrary = async (req, res) => {
  try {
    const library = await LibraryModel.find();
    if (!library) {
      res.json({ message: "library not found" });
    } else {
      res.json(library);
    }
  } catch (err) {
    res.json(err);
  }
};

// view library by id
module.exports.viewLibrary = async (req, res) => {
  try {
    const library = await LibraryModel.findById(req.params.id);
    if (!library) {
      res.json({ message: "Library not found" });
    } else {
      res.json(library);
    }
  } catch (err) {
    res.json(err);
  }
};
