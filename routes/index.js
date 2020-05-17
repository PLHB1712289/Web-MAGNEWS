var express = require('express');
var router = express.Router();
const apiWeather = require('../services/apiWeather');
const {coordinateHCMCity, webVOV} = require('../resource')

const {scrapingHomeVOV} = require('../services/scraping');
const {groupingNewsHome} = require('../services/helper');


const getNewsHomePage = async () => {
  const sportData = await scrapingHomeVOV(webVOV.categorySport);
  const businessData = await scrapingHomeVOV(webVOV.categoryBusiness);
  const worldData = await scrapingHomeVOV(webVOV.categoryWorld);
  const healthData = await scrapingHomeVOV(webVOV.categoryHealth);
  const armyData = await scrapingHomeVOV(webVOV.categoryArmy);

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
    category: "Thể thao", linkCategory: "/sport", news: sportNews
  });
  postCategory.push({
    category: "Kinh tế", linkCategory: "/business", news: businessNews
  });
  postCategory.push({
    category: "Thế giới", linkCategory: "/world", news: worldNews
  });
  postCategory.push({
    category: "Sức khỏe", linkCategory: "/health", news: healthNews
  });

  postCategory.push({
    category: "Quân sự", linkCategory: "/army", news: armyNews
  });

  return {postCategory, featurePostMedium, featurePostLarge, featurePostSmallBus, featurePostSmallHeal};
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  const temp = await apiWeather(coordinateHCMCity);

  const {postCategory, featurePostMedium, featurePostLarge, featurePostSmallBus, featurePostSmallHeal} = await getNewsHomePage();
  
  res.render('index', 
  {categoryNews: 'Trang chủ', temp, 
  postCategory, featurePostMedium, featurePostLarge, featurePostSmallBus, featurePostSmallHeal});
});

module.exports = router;