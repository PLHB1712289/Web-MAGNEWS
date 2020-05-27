const { scrapingVOV, getDate } = require("../api/scraping");
const {
  webVOV,
  maxPageNumberDefault,
  maxTimeSleep,
  maxNewsNeedAdd,
  isFirstUpdate,
} = require("../../resource");
const newsModel = require("../../models/news");

const maxPageNumber = maxPageNumberDefault;
const timeSleep = maxTimeSleep;
let isUpdate = false;

const updateNews = async (news, category) => {
  const newsDB = await newsModel.findOne({ link: news.link });

  if (newsDB == null) {
    const newNews = new newsModel({
      title: news.title,
      img: news.img,
      link: news.link,
      category: category,
      time: news.time,
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

      let maxNews = maxNewsNeedAdd;
      if (isFirstUpdate) {
        maxNews = listNews.length;
      }

      for (let index = 0; index < maxNews; index++) {
        let time;
        try {
          time = await getDate(listNews[index].link);
        } catch (error) {
          console.log(listNews[index].link);
          time = 0;
        }

        listNews[index].time = time;
        await updateNews(listNews[index], webVOV[element].id);
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
    isUpdate = true;
    console.log("update database !!");
    updateDatabase().then((data) => (isUpdate = false));
    await sleep(timeSleep);
  }
};

module.exports = { autoUpdateDB, isUpdate };
