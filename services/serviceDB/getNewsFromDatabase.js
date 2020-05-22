const newModel = require("../../models/news");

// const { webVOV } = require("../../resource");

// const connectDatabase = require("../../database/connectMongodb");
// connectDatabase();

const getNewsFromDatabase = async (category, limit) => {
  if (typeof limit == "undefined") {
    const news = await newModel.find({ category: category.id }).limit(33);
    return news;
  } else {
    const news = await newModel.find({ category: category.id }).limit(limit);
    return news;
  }
};

module.exports = getNewsFromDatabase;
