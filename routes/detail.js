var express = require('express');
var router = express.Router();

const {coordinateHCMCity} = require('../resource');
const {groupingNews} = require('../services/helper');
const {scrapingVOVNews} = require('../services/scraping');
const apiWeather = require('../services/apiWeather');

router.get('/', async function(req, res, next) {
  const temp = await apiWeather(coordinateHCMCity);
  
  const url = req.query.url;
  const {time, body, author, title, newsRelated} = await scrapingVOVNews(url);
  res.render('detailNews', {time, body, author, title, temp, newsRelated});
});

module.exports = router;
