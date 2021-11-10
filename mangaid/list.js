const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const { Domain } = require("./config");
const url = `${Domain}/latest-release`;

const PupperBrowser = async () => {
  return await puppeteer
    .launch()
    .then((browser) => browser.newPage())
    .then(async (page) => {
      return await page.goto(url).then(async () => {
        return await page.content();
      });
    });
};

const Index = async () => {
  await PupperBrowser()
    .then((html) => {
      console.log(html);
      const $ = cheerio.load(html);
      const newsHeadlines = [];
      $(`h3 > a`).each(function () {
        const title = $(this).text();
        const link = $(this).attr();
        const linkReplace = link.href.replace(`${Domain}/manga`, "");
        newsHeadlines.push({
          title: title,
          link: linkReplace,
        });
      });

      console.log(newsHeadlines);
    })
    .catch(console.error);
};

module.exports = { Index };
