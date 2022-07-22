const MangaModel = require("../model/manga.model");
const ChapterModel = require("../model/chapter.model");
const LibraryModel = require("../model/library.model");
const UserModel = require("../model/user.model");
const fs = require("fs");
// view displays manga
module.exports.viewCreateManga = async (req, res) => {
  try {
    res.render("components/manga/createManga");
  } catch (err) {
    res.json(err);
  }
};
// crete manga
module.exports.createManga = async (req, res) => {
  try {
    const manga = await MangaModel.findOne({ name: req.body.name });
    if (manga) {
      res.json({ manga: manga });
    } else {
      await MangaModel.create({
        avatar: "/" + req.file.path,
        name: req.body.name,
        category: req.body.category,
        author: req.body.author,
        description: req.body.description,
        like: req.body.like,
        price: req.body.price,
      });
    }
    res.json({
      message: "login success",
      status: 200,
      err: false,
    });
  } catch (err) {
    res.json(err);
  }
};

// view manga
module.exports.viewAllManga = async (req, res) => {
  try {
    const mangas = await MangaModel.find({});
    if (mangas == 0) {
      res.json("ko co manga nao");
    } else {
      res.render("components/manga/viewAllManga", { mangas });
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.viewDetails = async (req, res) => {
  try {
    const cookies = req.cookies;
    const user = await UserModel.findOne({ token: cookies.user });
    const manga = await MangaModel.findOne({ _id: req.params.id });
    const chapter = await ChapterModel.find({ MangaID: req.params.id });
    const follows = await LibraryModel.find({ MangaID: req.params.id });

    let followed = "";
    for (let i = 0; i < follows.length; i++) {
      if (user.id === follows[i].userID) {
        followed = follows[i];
      }
    }

    if (!manga) {
      res.json("ko co manga nao");
    } else {
      if (followed.userID == user.id && followed.MangaID == manga.id) {
        res.render("components/manga/viewDetails", {
          manga,
          chapter,
          followed,
        });
      } else {
        let followed = {
          id: "",
        };
        res.render("components/manga/viewDetails", {
          manga,
          chapter,
          followed,
        });
      }
      //   // console.log(manga);
    }
  } catch (err) {
    res.json(err);
  }
};

//edit manga
module.exports.viewEditManga = async (req, res) => {
  try {
    res.render("components/manga/editManga");
  } catch (err) {
    res.json(err);
  }
};
module.exports.editManga = async (req, res) => {
  const mangaID = req.params.id;
  try {
    const manga = await MangaModel.findOne({ _id: mangaID }).lean();
    if (!manga) {
      res.json({ message: "manga khong ton tai" });
    } else {
      await MangaModel.updateOne(
        {
          _id: mangaID,
        },
        req.body
      );
      res.json({ message: "success" });
    }
  } catch (err) {
    res.json({ message: "loi 3" });
  }
};

//delete manga
module.exports.deleteManga = async (req, res) => {
  const mangaID = req.params.id;
  try {
    const manga = await MangaModel.findOne({ _id: mangaID });
    if (manga) {
      await MangaModel.findByIdAndDelete(manga._id);
      fs.unlinkSync(manga.avatar);
      res.json({ message: "delete manga success" });
    } else {
      res.json({ message: "manga not found" });
    }
  } catch (err) {
    res.json(err);
  }
};
