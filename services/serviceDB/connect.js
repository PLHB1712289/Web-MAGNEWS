const mongoose = require("mongoose");
const { urlMongoDB } = require("../../resource");

const connectDatabase = () => {
  mongoose.connect(urlMongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("connected to Mongodb Atlas");
  });
};

module.exports = connectDatabase;
