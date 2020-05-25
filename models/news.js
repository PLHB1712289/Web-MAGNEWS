var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newsShema = new Schema({
  title: String,
  img: String,
  link: String,
  category: Number,
  time: Number,
});

module.exports = mongoose.model("news", newsShema);
