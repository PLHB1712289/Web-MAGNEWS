var express = require("express");
var router = express.Router();

const { scrapingVOVNews } = require("../services/api/scraping");
const { getData } = require("../cache/cache");

router.get("/", async function (req, res, next) {
  const temp = await getData("temp");

  const url = req.query.url;
  const { time, body, author, title, newsRelated } = await scrapingVOVNews(url);
  res.render("detailNews", {
    time,
    body,
    author,
    title,
    temp,
    newsRelated,
    categoryNews: "Bài viết",
  });
});

module.exports = router;
