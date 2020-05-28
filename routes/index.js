var express = require("express");
var router = express.Router();
const { getData } = require("../cache/cache");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const temp = await getData("temp");

  const {
    postCategory,
    featurePostMedium,
    featurePostLarge,
    featurePostSmallBus,
    featurePostSmallHeal,
  } = await getData("home");

  res.render("index", {
    categoryNews: "Trang chủ",
    temp,
    postCategory,
    featurePostMedium,
    featurePostLarge,
    featurePostSmallBus,
    featurePostSmallHeal,
    user: req.user,
  });
});

module.exports = router;
