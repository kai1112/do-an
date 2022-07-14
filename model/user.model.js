const mongoose = require("./dbconnect");


const UserSchema = mongoose.Schema(
  {
    avatar: String,
    username: String,
    password: String,
    name: String,
    dateOfBirth: Date,
    token: String,
    email: String,
    role: String,
  },
  { collection: "User" }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
