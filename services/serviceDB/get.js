const newModel = require("../../models/news");
const { webVOV } = require("../../resource");
const { groupingNewsHome } = require("../api/helper");

const getNewsFromDatabase = async (category, limit, pageNumber) => {
  if (typeof limit == "undefined") {
    limit = 33;
  }

  let skipNews = 0;
  if (typeof pageNumber != "undefined") {
    skipNews = (pageNumber - 1) * 33;
  }

  const news = await newModel.find(
    { category: category.id },
    ["title", "img", "link", "time"],
    { skip: skipNews, limit: limit, sort: { time: -1 } }
  );

  return news;
};

const getNewsForHomePage = async () => {
  const sportData = await getNewsFromDatabase(webVOV.categorySport, 4);
  const businessData = await getNewsFromDatabase(webVOV.categoryBusiness, 4);
  const worldData = await getNewsFromDatabase(webVOV.categoryWorld, 4);
  const healthData = await getNewsFromDatabase(webVOV.categoryHealth, 4);
  const armyData = await getNewsFromDatabase(webVOV.categoryArmy, 4);

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

module.exports = { getNewsFromDatabase, getNewsForHomePage };
