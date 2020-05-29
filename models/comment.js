var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentShema = new Schema({
  msg: String,
  idUser: String,
  userName: String,
  urlNews: String,
  time: Number,
});

module.exports = mongoose.model("comment", commentShema);
