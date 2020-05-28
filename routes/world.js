var express = require("express");
var router = express.Router();

const { webVOV } = require("../resource");
const { groupingNews } = require("../services/api/helper");
const { getData } = require("../cache/cache");

router.get("/", async function (req, res, next) {
  let pageNumber = req.query.page;
  if (typeof pageNumber == "undefined") {
    pageNumber = 1;
  }
  pageNumber = parseInt(pageNumber);
  if (pageNumber <= 0) {
    pageNumber = 1;
  }
  const temp = await getData("temp");
  let data = (await getData(webVOV.categoryWorld, pageNumber)).slice(0);

  //const data = Object.assign({}, result);
  const listPage = [];
  if (data.length > 33) {
    if (pageNumber - 1 > 0) {
      listPage.push({
        pageNumber: pageNumber - 1,
        link: `/world?page=${pageNumber - 1}`,
        isActive: false,
      });
    }
    listPage.push({
      pageNumber: pageNumber,
      link: `/world?page=${pageNumber}`,
      isActive: true,
    });
    listPage.push({
      pageNumber: pageNumber + 1,
      link: `/world?page=${pageNumber + 1}`,
      isActive: false,
    });
  } else {
    if (pageNumber - 1 > 0) {
      listPage.push({
        pageNumber: pageNumber - 1,
        link: `/world?page=${pageNumber - 1}`,
        isActive: false,
      });
    }
    listPage.push({
      pageNumber: pageNumber,
      link: `/world?page=${pageNumber}`,
      isActive: true,
    });
  }

  data.pop();

  const {
    newsFeaturePostLarge,
    newsFeaturePost,
    newsPost,
    newsShortContent,
  } = groupingNews(data, "world");

  res.render("categories/viewNews", {
    newsFeaturePostLarge,
    newsFeaturePost,
    newsPost,
    newsShortContent,
    categoryNews: "Thế giới",
    temp,
    listPage,
    user: req.user,
  });
});

module.exports = router;
