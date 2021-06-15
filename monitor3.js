const puppeteer = require('puppeteer');

const fs = require('fs');

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
// async function initBrowser() {
//   const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: null,
//     userDataDir: './cache',
//     // args: ['--no-sandbox', '--disable-gpu'],
//   });
//   const page = await browser.newPage();

//   await page.goto(rand_url);
//   return page;
// }

(async () => {
  try {
    const browser = await puppeteer.launch({
      userDataDir: './cache',
      headless: false,
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-gpu'],
    });
    const page = await browser.newPage();
    page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.url().endsWith('.png')) {
        req.abort();
      } else {
        req.continue();
      }
    });

    page.on('error', (e) => console.log(e));

    await page.goto(rand_url);
    await page.click("input[id='btnSignIn']", { delay: 20 });
    await page.waitForTimeout(4000);
    await page.type("input[id='su1UserName']", 'ameshalexusa@gmail.com', {
      delay: 20,
    });
    await page.waitForTimeout(4000);

    await page.type("input[id='su1Password']", 'Water@123', {
      delay: 20,
    });
    await page.waitForTimeout(4000);
    await page.click("input[id='btnSu1Login']", { delay: 20 });
    await page.waitForTimeout(4000);
    await page.click("a[id='tabA9']", { delay: 20 });
    await page.waitForTimeout(4000);

    // await browser.close();
  } catch (e) {
    console.log(e);
  }
})();
