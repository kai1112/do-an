const mongoose = require("mongoose");
const mongooseDBLink = process.env.mongodblink;
mongoose.connect(mongooseDBLink);

module.exports = mongoose;
