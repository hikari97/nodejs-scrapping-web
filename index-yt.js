const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const url = "https://www.youtube.com//";

puppeteer
  .launch()
  .then((browser) => browser.newPage())
  .then((page) => {
    return page.goto(url).then(function () {
      return page.content();
    });
  })
  .then((html) => {
    // console.log(html);
    const $ = cheerio.load(html);
    const newsHeadlines = [];
    $(`#video-title-link`).each(function () {
      const src = $(this).attr();
      newsHeadlines.push({
        title: src.title,
        url: src.href,
        // atr: src,
      });
    });

    console.log(newsHeadlines);
  })
  .catch(console.error);
