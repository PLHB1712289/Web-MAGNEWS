var express = require("express");
var router = express.Router();

const { webVOV } = require("../resource");
const { groupingNews } = require("../services/api/helper");
const { getData } = require("../cache/cache");

router.get("/", async function (req, res, next) {
  const temp = await getData("temp");

  //const data = await scrapingVOV(webVOV.categorySport.url);
  const data = await getData(webVOV.categoryBusiness);
  const {
    newsFeaturePostLarge,
    newsFeaturePost,
    newsPost,
    newsShortContent,
  } = groupingNews(data, "business");

  res.render("categories/viewNews", {
    newsFeaturePostLarge,
    newsFeaturePost,
    newsPost,
    newsShortContent,
    categoryNews: "Kinh tế",
    temp,
  });
});

module.exports = router;
