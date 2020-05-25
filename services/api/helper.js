const groupingNews = (listNews, categoryNews) => {
  const newsFeaturePostLarge = [];
  const newsFeaturePost = [];
  const newsPost = [];
  const newsShortContent = [];

  let countNewsShortContent = 0;

  for (let i = 0; i < listNews.length; i++) {
    if (listNews[i].img !== "" && listNews[i].shortContent !== "") {
      if (newsFeaturePost.length < 4) {
        if (newsFeaturePostLarge.length == 0) {
          newsFeaturePostLarge.push({
            title: listNews[i].title,
            img: listNews[i].img,
            link: `/detail?url=${listNews[i].link}`,
            categoryNews: categoryNews,
          });
        } else {
          newsFeaturePost.push({
            title: listNews[i].title,
            img: listNews[i].img,
            link: `/detail?url=${listNews[i].link}`,
            categoryNews: categoryNews,
          });
        }
      } else {
        newsPost.push({
          title: listNews[i].title,
          img: listNews[i].img,
          link: `/detail?url=${listNews[i].link}`,
        });
      }
    } else {
      if (listNews[i].shortContent !== "" && listNews[i].img === "") {
        countNewsShortContent++;
        newsShortContent.push({
          title: listNews[i].title,
          img: listNews[i].img,
          link: `/detail?url=${listNews[i].link}`,
          countNewsShortContent: countNewsShortContent,
        });
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
    newsFeaturePost.push({
      title: listNews[i].title,
      img: listNews[i].img,
      link: `/detail?url=${listNews[i].link}`,
    });
  }

  return { newsFeaturePost, newsFeaturePostLarge };
};

module.exports = {
  groupingNews,
  groupingNewsHome,
};
