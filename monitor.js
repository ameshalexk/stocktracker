const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');
const $ = require('cheerio');

const ps5_url =
  'https://www.walmart.com/ip/Sony-PlayStation-5-Digital-Edition/493824815';
const rand_url =
  'https://www.walmart.com/ip/Nintendo-Switch-Lite-Console-Turquoise/306029956';

async function initBrowser() {
  const browser = await puppeteer.launch({
    headless: false,
    // args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.goto(rand_url);
  return page;
}

async function checkStock(page) {
  await page.reload();
  let content = await page.evaluate(() => document.body.innerHTML);
  $("link[itemprop='availability']", content).each(function () {
    let out_of_stock = $(this)
      .attr('href')
      .toLowerCase()
      .includes('outofstock');
    if (out_of_stock) {
      console.log('out of stock');
    } else {
      console.log('In stock');
    }
  });
}

async function monitor() {
  let page = await initBrowser();
  await checkStock(page);
}

monitor();
