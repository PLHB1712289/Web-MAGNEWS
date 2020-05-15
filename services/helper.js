const groupingNews = (listNews, categoryNews) => {
    const newsFeaturePostLarge = [];
    const newsFeaturePost = [];
    const newsPost = [];
    const newsShortContent = [];

    let countNewsShortContent = 0;

    for(let i = 0; i < listNews.length; i++){
        listNews[i].link = `/detail?url=${listNews[i].link}`;
        
        if(listNews[i].img !== '' && listNews[i].shortContent !== ''){
            if(newsFeaturePost.length < 4){
                listNews[i].categoryNews = categoryNews;
                
                if(newsFeaturePostLarge.length == 0){
                    newsFeaturePostLarge.push(listNews[i]);
                }
                else{
                    newsFeaturePost.push(listNews[i]);
                }
            }
            else{
                newsPost.push(listNews[i]);
            }
        }
        else{
            if(listNews[i].shortContent !== '' && listNews[i].img === ''){
                countNewsShortContent++;
                listNews[i].countNewsShortContent = countNewsShortContent;
                newsShortContent.push(listNews[i]);
            }
        }
    }

    return {newsFeaturePostLarge, newsFeaturePost, newsPost, newsShortContent};
}

const groupingNewsHome = (listNews, categoryNews) => {
    const newsFeaturePost = [];

    listNews[0].link = `/detail?url=${listNews[0].link}`;
    const newsFeaturePostLarge = listNews[0];

    for(let i = 1; i < listNews.length; i++){

        listNews[i].link = `/detail?url=${listNews[i].link}`;
        newsFeaturePost.push(listNews[i]);
    }

    return {newsFeaturePost, newsFeaturePostLarge};
}

module.exports = {
    groupingNews, groupingNewsHome
}