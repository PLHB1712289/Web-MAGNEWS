var express = require('express');
var router = express.Router();

const {webVOV, coordinateHCMCity} = require('../resource');
const {groupingNews} = require('../services/helper');
const {scrapingVOV} = require('../services/scraping');
const apiWeather = require('../services/apiWeather');
const {getCache, storage} = require('../cache/cache');

router.get('/', async function(req, res, next) {
  const temp = await apiWeather(coordinateHCMCity);
  
  if(typeof getCache() == 'undefined')
  {
    
    const data = await scrapingVOV(webVOV.categorySport);
    const cacheStorage = groupingNews(data, "sport");
    storage(cacheStorage);
  }

  const {newsFeaturePostLarge, newsFeaturePost, newsPost, newsShortContent} = getCache();

  res.render('categories/viewNews', 
  {newsFeaturePostLarge, newsFeaturePost, newsPost, newsShortContent,
  categoryNews: "Thể thao", temp});

  
});

module.exports = router;
