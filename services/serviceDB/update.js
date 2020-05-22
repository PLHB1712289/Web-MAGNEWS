const { scrapingVOV } = require("../api/scraping");
const { webVOV, maxPageNumberDefault } = require("../../resource");
const { maxTimeSleep } = require("../../resource");
const newsModel = require("../../models/news");

const maxPageNumber = maxPageNumberDefault;
const timeSleep = maxTimeSleep;

const updateNews = async (news, category) => {
  const newsDB = await newsModel.findOne({ link: news.link });

  if (newsDB == null) {
    const newNews = new newsModel({
      title: news.title,
      img: news.img,
      link: news.link,
      category: category,
    });

    newNews.save();

    console.log("add news !!");
  } else {
    //do nothing
    console.log("news exist !!");
  }
};

const updateDatabase = async () => {
  for (element in webVOV) {
    for (let pageNumber = maxPageNumber; pageNumber > 0; pageNumber--) {
      //do something
      const listNews = await scrapingVOV(webVOV[element].url, pageNumber);
      for (let index = 0; index < listNews.length; index++) {
        updateNews(listNews[index], webVOV[element].id);
      }
    }
    console.log(webVOV[element].url);
  }

  return "done";
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const autoUpdateDB = async () => {
  while (1) {
    console.log("update database !!");
    updateDatabase();
    await sleep(timeSleep);
  }
};

module.exports = autoUpdateDB;
