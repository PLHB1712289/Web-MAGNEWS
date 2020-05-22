var express = require("express");
var router = express.Router();

const { webVOV } = require("../resource");
const { groupingNews } = require("../services/api/helper");
const { getData } = require("../cache/cache");

router.get("/", async function (req, res, next) {
  const temp = await getData("temp");

  //const data = await scrapingVOV(webVOV.categorySport.url);
  const data = await getData(webVOV.categoryEntertainment);
  const {
    newsFeaturePostLarge,
    newsFeaturePost,
    newsPost,
    newsShortContent,
  } = groupingNews(data, "entertainment");

  // console.log("\n\n\n==========ROUTER==========");
  // console.log(data);

  res.render("categories/viewNews", {
    newsFeaturePostLarge,
    newsFeaturePost,
    newsPost,
    newsShortContent,
    categoryNews: "Giải trí",
    temp,
  });
});

module.exports = router;
