const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const url = "https://komikindo.id/komik-terbaru/";

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
    $(`.animposx > a[href*="/komik/"]`).each(function () {
      const src = $(this).attr();
      const linkReplace = src.href.replace("https://komikindo.id/komik", "");
      newsHeadlines.push({
        title: src.title,
        link: linkReplace,
      });
    });

    console.log(newsHeadlines);
  })
  .catch(console.error);
