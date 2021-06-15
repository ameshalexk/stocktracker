const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');
const $ = require('cheerio');

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// function removeChromiumAlert() {
//   try {
//     const chromiumPath = '/chrome-mac/Chromium.app';
//     const macPath = path.join(
//       path.dirname(require.resolve('puppeteer')),
//       '/.local-chromium/'
//     );
//     const [generatedDir] = fs
//       .readdirSync(macPath, { withFileTypes: true })
//       .filter((dirent) => dirent.isDirectory())
//       .map((dirent) => dirent.name);
//     const chromiumAppPath = path.join(macPath, generatedDir, chromiumPath);
//     const mode = `0${(
//       fs.statSync(chromiumAppPath).mode & parseInt('777', 8)
//     ).toString(8)}`;

//     if (mode !== '0777') {
//       execSync(`sudo chmod 777 ${chromiumAppPath}`);
//       execSync(`sudo codesign --force --deep --sign - ${chromiumAppPath}`);
//     }
//   } catch (err) {
//     console.warn(
//       'unable to sign Chromium, u may see the annoying message when the browser start'
//     );
//     console.warn(err);
//   }
// }

// const ps5_url =
//   'https://www.walmart.com/ip/Sony-PlayStation-5-Digital-Edition/493824815';
// const rand_url = 'https://www.google.com';
const rand_url =
  'https://clients.mindbodyonline.com/asp/adm/adm_appt_search.asp?studioid=253992&tab';
// const rand_url =
//   'https://www.walmart.com/ip/Nintendo-Switch-Lite-Console-Turquoise/306029956';
// const rand_url =
//   'https://www.walmart.com/ip/Sony-PlayStation-5-Digital-Edition/493824815';
// removeChromiumAlert();
async function initBrowser() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    // args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();

  await page.goto(rand_url);
  return page;
}

async function sendNotification() {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ameshalexburner@gmail.com',
      pass: 'Water@123',
    },
  });

  let textToSend = 'Go get that Playstation 5!';
  let htmlText = `<a href=\"${rand_url}\">Link</a>`;

  let info = await transporter.sendMail({
    from: '"Walmart Monitor" <ameshalexusa@gmail.com>',
    to: 'ameshalexusa@gmail.com',
    subject: 'Playstation 5 IS IN STOCK',
    text: textToSend,
    html: htmlText,
  });

  console.log('Message Sent: %s', info.messageId);
}

async function checkStock(page) {
  await page.reload();
  console.log(page._frameManager._mainFrame._mainWorld._frameManager._page);

  // const nodeChildren = await page.$eval(body, (uiElement) => {
  //   return uiElement.children;
  // });
  // console.log(nodeChildren); // Outputs the array of the nodes children

  // let content = await page.evaluate(() => document.body.innerHTML);
  // console.log('ss');
  // await page.type('body', 'ameshalexusa@gmail.com', { delay: 10 });

  // const example = await page.$('#footer');

  // console.log(example);
}

async function monitor() {
  const page = await initBrowser();
  let job = new CronJob(
    '*/30 * * * *',
    function () {
      checkStock(page);
    },
    null,
    true,
    null,
    null,
    true
  );
  job.start();
}

monitor();
