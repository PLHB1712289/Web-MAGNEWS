var express = require("express");
var router = express.Router();

const { scrapingVOVNews } = require("../services/api/scraping");
const { getData } = require("../cache/cache");
const ensureAuthenticated = require("../config/ensureAuth");
const commentModel = require("../models/comment");
router.get("/", async function (req, res, next) {
  const temp = await getData("temp");
  const url = req.query.url;
  if (typeof url == "undefined") {
    res.send("url not found !!");
  } else {
    const listComment = await commentModel.find({ urlNews: url });
    const actionForm = `/detail?url=${url}`;
    const shareLink = `http://magnews.herokuapp.com${actionForm}`;
    const { time, body, author, title, newsRelated } = await scrapingVOVNews(
      url
    );
    res.render("detailNews", {
      time,
      body,
      author,
      title,
      temp,
      newsRelated,
      categoryNews: "Bài viết",
      user: req.user,
      actionForm,
      listComment,
      shareLink,
    });
  }
});

router.post("/", ensureAuthenticated, async (req, res, next) => {
  const url = req.query.url;
  const { msg } = req.body;
  const idUser = req.user.id;
  const userName = req.user.displayName;
  const time = new Date();
  const newComment = new commentModel({
    msg: msg,
    idUser: idUser,
    userName: userName,
    time: time,
    urlNews: url,
  });

  newComment.save();
  const listComment = await commentModel.find({ urlNews: url });

  const temp = await getData("temp");

  if (typeof url == "undefined") {
    res.send("url not found !!");
  } else {
    const actionForm = `/detail?url=${url}`;
    const { time, body, author, title, newsRelated } = await scrapingVOVNews(
      url
    );
    res.render("detailNews", {
      time,
      body,
      author,
      title,
      temp,
      newsRelated,
      categoryNews: "Bài viết",
      user: req.user,
      actionForm,
      listComment,
    });
  }
});
module.exports = router;
