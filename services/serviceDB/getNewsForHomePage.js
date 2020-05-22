const newModel = require("../../models/news");

const { webVOV } = require("../../resource");
const getNewsFromDatabase = require("./getNewsFromDatabase");
const { groupingNewsHome } = require("../api/helper");

const getNewsForHomePage = async () => {
  const sportData = await getNewsFromDatabase(webVOV.categorySport, 5);
  const businessData = await getNewsFromDatabase(webVOV.categoryBusiness, 5);
  const worldData = await getNewsFromDatabase(webVOV.categoryWorld, 5);
  const healthData = await getNewsFromDatabase(webVOV.categoryHealth, 5);
  const armyData = await getNewsFromDatabase(webVOV.categoryArmy, 5);

  const sportNews = groupingNewsHome(sportData, "sport");
  const businessNews = groupingNewsHome(businessData, "business");
  const worldNews = groupingNewsHome(worldData, "world");
  const healthNews = groupingNewsHome(healthData, "health");
  const armyNews = groupingNewsHome(armyData, "army");

  const featurePostLarge = sportNews.newsFeaturePostLarge;
  const featurePostMedium = worldNews.newsFeaturePostLarge;
  const featurePostSmallBus = businessNews.newsFeaturePostLarge;
  const featurePostSmallHeal = healthNews.newsFeaturePostLarge;

  // const featurePostLarge = null;
  // const featurePostMedium = null;
  // const featurePostSmallBus = null;
  // const featurePostSmallHeal = null;

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
module.exports = getNewsForHomePage;
