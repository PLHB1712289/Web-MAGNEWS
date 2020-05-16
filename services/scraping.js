const cheerio = require('cheerio');
const axios = require('axios');

const util = require('util');

const web = 'https://vov.vn';
const categories = ['','/chinh-tri/', '/doi-song/', '/the-gioi/', 
                    '/kinh-te/', '/xa-hoi/', '/phap-luat/', 
                    '/the-thao/', '/van-hoa-giai-tri/', '/quan-su-quoc-phong/', 
                    '/suc-khoe/', '/oto-xe-may/'];

const scrapingVOV = async (category)=>{
    const url = web + categories[category];

    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const story = [];

    $('.story').each((index, element)=>{
        const title = $(element).find('a').text().replace(/\s\s+/, '').replace('\n', '');
        const shortContent = $(element).find('p').text().replace('\n', '');
        const link = web + $(element).find('a').attr('href');
        let img = $(element).find('img').attr('src');
        if(typeof img == 'undefined'){
            img = '';
        }      
        
        if(link.split(categories[category]).length >= 2)
        {
            story.push({
                title: title,
                shortContent: shortContent,
                img: img,
                link: link
            });
        }   
    });

    return story;
};

const scrapingHomeVOV = async (category)=>{
    const url = web + categories[category];

    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const story = [];

    const dataStory = $('.story');
    for(let i = 0; i < dataStory.length; i++){
        if(story.length > 3){
            break;
        }
        let img = $(dataStory[i]).find('img');
        let imgSrc = img.attr('src');
        if (!img.hasClass("lazy")) img.addClass("lazy");
        if(typeof imgSrc != 'undefined'){
            const title = $(dataStory[i]).find('a').text().replace(/\s\s+/, '').replace('\n', '');
            const shortContent = $(dataStory[i]).find('p').text().replace('\n', '');
            const link = web + $(dataStory[i]).find('a').attr('href');
            img.removeAttr("src");
            img.attr("dataSrc", imgSrc);
            if(link.split(categories[category]).length >= 2)
            {
                story.push({
                    title: title,
                    shortContent: shortContent,
                    img: img,
                    link: link
                });
            }
        }
        
    }

    return story;
};

const scrapingVOVNews = async(url)=>{
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const title = $('.cms-title').text();
    const author = $('.cms-author').text();
    const time = $('time').text();    

    const body = [];
    const newsRelated = [];

    $('.cms-body').each((index, element)=>{
        ($(element).find('img')).each((index, e)=>{
            let title = $(e).attr('data-desc');

            if(typeof title == 'undefined')
                title = $(e).attr('cms-photo-caption');
            
            body.push({
                img: {
                    title,
                    dataSrc: $(e).attr('src'),
                    class: 'lazy'
                },
                paragraph: ''
            });
        });
        
        let cont = $(element).find('p');
        cont.each((i, e)=>{
            //console.log($(e).text() + '\n');
            body.push({
                img: '',
                paragraph: $(e).text().replace('\n', '')
            });
        })
    });
    
    $('.stories-style-123 .story').each((index, element)=>{
        const img = $(element).find('img').attr('src');
        const link = `/detail?url=${web + $(element).find('a').attr('href')}`;
        const title = $(element).find('a').attr('title')

        newsRelated.push({img, link, title});
    });

    return {time, body, title, author, newsRelated};
}

module.exports = {scrapingVOV, scrapingVOVNews, scrapingHomeVOV};

//scrapingVOVNews("https://vov.vn/the-thao/bong-da/tuan-manh-chia-tay-khanh-hoa-la-vi-hlv-park-hang-seo-1048721.vov");