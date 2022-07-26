const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// register user
module.exports.showLogin = async (req, res) => {
  try {
    res.render("components/login/login");
  } catch (e) {
    res.json(e);
  }
};
module.exports.showRegisters = async function (req, res) {
  try {
    res.render("components/register/register");
  } catch (error) {
    console.log(error);
  }
};

module.exports.registers = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    let newUser = await UserModel.create({
      username: req.body.username,
      password: password,
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      role: "user",
    });
    res.json({
      message: "login success",
      status: 200,
      err: false,
    });
  } catch (err) {
    res.json(err);
  }
};

// login user
module.exports.login = async (req, res) => {
  try {
    const data = await UserModel.findOne({
      username: req.body.username,
    });
    // console.log(data);
    if (data) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        data.password
      );
      if (checkPassword) {
        const UserID = data._id;
        const token = jwt.sign(`${UserID}`, "kai");
        const a = await UserModel.updateOne(
          { _id: data._id },
          { token: token }
        );
        // console.log(56, a);
        res.cookie("user", token, {
          expires: new Date(Date.now() + 6000000),
        });
        res.json({
          message: "login success",
          status: 200,
          err: false,
          userid: UserID,
        });
      } else {
        res.json({ message: " incorrect password" });
      }
    } else {
      res.json({ message: "login failed", status: 400, err: false });
    }
  } catch (err) {
    // res.json(err);
    console.log(76, err);
  }
};

// view all user
module.exports.viewAllUsers = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.render("pages/user/viewUser");
  } catch (err) {
    res.json({ message: "khong the lay duoc use" });
  }
};

// edit user
module.exports.editUser = async (req, res) => {
  const userID = req.params.id;
  // console.log(userID);
  try {
    const user = await UserModel.findById(userID).lean();
    if (!user) {
      return res.status(404).json({ message: "can't find user" });
    } else {
      await UserModel.updateOne(
        {
          _id: userID,
        },
        req.body
      );
      res.json({ message: "success" });
    }
  } catch (err) {
    res.json({ message: "looix" });
  }
};
