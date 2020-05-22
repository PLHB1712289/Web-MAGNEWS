var express = require("express");
var router = express.Router();

const { webVOV } = require("../resource");
const { groupingNews } = require("../services/api/helper");
const { getData } = require("../cache/cache");

router.get("/", async function (req, res, next) {
  const temp = await getData("temp");

  //const data = await scrapingVOV(webVOV.categorySport.url);
  const data = await getData(webVOV.categoryLaw);
  const {
    newsFeaturePostLarge,
    newsFeaturePost,
    newsPost,
    newsShortContent,
  } = groupingNews(data, "law");

  res.render("categories/viewNews", {
    newsFeaturePostLarge,
    newsFeaturePost,
    newsPost,
    newsShortContent,
    categoryNews: "Pháp luật",
    temp,
  });
});

module.exports = router;
