const LibraryModel = require("../model/library.model");
const UserModel = require("../model/user.model");
// create new Library
module.exports.createLibrary = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const user = await UserModel.findOne({ token: cookies.user });
    // console.log(user);
    if (user) {
      const library = await LibraryModel.create({
        status: "  đã flow ",
        MangaID: req.body.MangaId,
        userID: user.id,
      });
      // console.log(library);
    }
    res.json({
      message: "login success",
      status: 200,
      err: false,
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// delete the library
module.exports.deleteLibrary = async (req, res) => {
  try {
    const cookies = req.cookies;
    const user = await UserModel.findOne({ token: cookies.user });
    // console.log(user);
    if (user) {
      const followed = await LibraryModel.find({ _id: req.body.id });
      console.log(36, followed);
      // console.log(37, followed[0]);
      if (followed) {
        // console.log(38, followed[0].id);
        console.log(req.body.id);
        let a = await LibraryModel.deleteOne({ _id: req.body.id });
        console.log(a);
        // res.json({ message: "delete manga success" });
      } else {
        res.json({ message: "manga not found" });
      }
      res.json({
        message: "delete success",
        status: 200,
        err: false,
      });
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
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
