const cache = require("memory-cache");
const { coordinateHCMCity, webVOV } = require("../resource");
const { scrapingVOV, scrapingHomeVOV } = require("../services/api/scraping");
const { groupingNewsHome, sleep } = require("../services/api/helper");
const { isUpdate } = require("../services/serviceDB/update");
const {
  getNewsForHomePage,
  getNewsFromDatabase,
} = require("../services/serviceDB/get");

const apiWeather = require("../services/api/apiWeather");
const timeDead = 10 * 60 * 1000;

const getNewsHomePage = async () => {
  const sportData = await scrapingHomeVOV(webVOV.categorySport.url);
  const businessData = await scrapingHomeVOV(webVOV.categoryBusiness.url);
  const worldData = await scrapingHomeVOV(webVOV.categoryWorld.url);
  const healthData = await scrapingHomeVOV(webVOV.categoryHealth.url);
  const armyData = await scrapingHomeVOV(webVOV.categoryArmy.url);

  const sportNews = groupingNewsHome(sportData, "sport");
  const businessNews = groupingNewsHome(businessData, "business");
  const worldNews = groupingNewsHome(worldData, "world");
  const healthNews = groupingNewsHome(healthData, "health");
  const armyNews = groupingNewsHome(armyData, "army");

  const featurePostLarge = sportNews.newsFeaturePostLarge;
  const featurePostMedium = worldNews.newsFeaturePostLarge;
  const featurePostSmallBus = businessNews.newsFeaturePostLarge;
  const featurePostSmallHeal = healthNews.newsFeaturePostLarge;

  const postCategory = [];
  postCategory.push({
    category: "Thể thao",
    linkCategory: "/sport",
    news: sportNews,
  });
  postCategory.push({
    category: "Kinh tế",
    linkCategory: "/business",
    news: businessNews,
  });
  postCategory.push({
    category: "Thế giới",
    linkCategory: "/world",
    news: worldNews,
  });
  postCategory.push({
    category: "Sức khỏe",
    linkCategory: "/health",
    news: healthNews,
  });

  postCategory.push({
    category: "Quân sự",
    linkCategory: "/army",
    news: armyNews,
  });

  return {
    postCategory,
    featurePostMedium,
    featurePostLarge,
    featurePostSmallBus,
    featurePostSmallHeal,
  };
};

const pushData = (listNews, id) => {
  cache.put(id, listNews);
};

const getData = async (category, pageNumber) => {
  if (category == "home") {
    let data = cache.get("home");

    if (data == null) {
      console.log("Nope Data");
      if (isUpdate) {
        data = await getNewsHomePage();
        console.log("Scraping !!");
      } else {
        data = await getNewsForHomePage();
      }
      pushData(data, "home");
    }

    return data;
  } else if (category == "temp") {
    let data = cache.get("temp");

    if (data == null) {
      console.log("Nope Data");
      data = await apiWeather(coordinateHCMCity);
      pushData(data, "temp");
    }

    return data;
  } else {
    if (typeof pageNumber == "undefined") {
      pageNumber = 1;
    }
    let data;
    if (pageNumber == 1) {
      data = cache.get(category.id);
    } else {
      data = null;
    }

    if (data == null) {
      console.log("Nope Data");
      if (isUpdate) {
        data = await scrapingVOV(category.url);
        console.log("Scraping !!");
      } else {
        data = await getNewsFromDatabase(category, 34, pageNumber);
      }

      if (pageNumber == 1) {
        pushData(data, category.id);
      }
    }

    // console.log(data);
    return data;
  }
};

module.exports = { getData, pushData };
