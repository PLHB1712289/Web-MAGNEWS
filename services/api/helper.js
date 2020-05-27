const Month = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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

const groupingNewsHome = (listNews, category) => {
  const newsFeaturePost = [];

  let time = new Date(listNews[0].time);
  let strTime = `${Month[time.getMonth()]} ${time.getDate()}`;

  const newsFeaturePostLarge = {
    title: listNews[0].title,
    img: listNews[0].img,
    link: `/detail?url=${listNews[0].link}`,
    category: category,
    time: strTime,
  };

  for (let i = 1; i < listNews.length; i++) {
    time = new Date(listNews[i].time);
    strTime = `${Month[time.getMonth()]} ${time.getDate()}`;
    newsFeaturePost.push({
      title: listNews[i].title,
      img: listNews[i].img,
      link: `/detail?url=${listNews[i].link}`,
      category: category,
      time: strTime,
    });
  }

  return { newsFeaturePost, newsFeaturePostLarge };
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

module.exports = {
  groupingNews,
  groupingNewsHome,
  sleep,
};
