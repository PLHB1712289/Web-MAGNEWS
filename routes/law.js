var express = require('express');
var router = express.Router();

const {webVOV, coordinateHCMCity} = require('../resource');
const {groupingNews} = require('../services/helper');
const {scrapingVOV} = require('../services/scraping');
const apiWeather = require('../services/apiWeather');

router.get('/', async function(req, res, next) {
  const temp = await apiWeather(coordinateHCMCity);
  const data = await scrapingVOV(webVOV.categoryLaw);
  const {newsFeaturePostLarge, newsFeaturePost, newsPost, newsShortContent} = groupingNews(data, "law");

  res.render('categories/viewNews', 
  {newsFeaturePostLarge, newsFeaturePost, newsPost, newsShortContent, 
  categoryNews: "Pháp luật", temp});
});

module.exports = router;
