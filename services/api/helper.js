const groupingNews = (listNews, categoryNews) => {
  const newsFeaturePostLarge = [];
  const newsFeaturePost = [];
  const newsPost = [];
  const newsShortContent = [];

  let countNewsShortContent = 0;

  for (let i = 0; i < listNews.length; i++) {
    const news = Object.assign({}, listNews[i]);
    news.link = `/detail?url=${news.link}`;

    if (news.img !== "" && news.shortContent !== "") {
      if (newsFeaturePost.length < 4) {
        news.categoryNews = categoryNews;

        if (newsFeaturePostLarge.length == 0) {
          newsFeaturePostLarge.push(news);
        } else {
          newsFeaturePost.push(news);
        }
      } else {
        newsPost.push(news);
      }
    } else {
      if (news.shortContent !== "" && news.img === "") {
        countNewsShortContent++;
        news.countNewsShortContent = countNewsShortContent;
        newsShortContent.push(news);
      }
    }
  }

  return { newsFeaturePostLarge, newsFeaturePost, newsPost, newsShortContent };
};

const groupingNewsHome = (listNews) => {
  const newsFeaturePost = [];
  const newsFeaturePostLarge = {
    title: listNews[0].title,
    img: listNews[0].img,
    link: `/detail?url=${listNews[0].link}`,
  };

  for (let i = 1; i < listNews.length; i++) {
    let news = Object.assign({}, listNews[i]);
    news.link = `/detail?url=${news.link}`;
    newsFeaturePost.push(news);
  }

  return { newsFeaturePost, newsFeaturePostLarge };
};

module.exports = {
  groupingNews,
  groupingNewsHome,
};
