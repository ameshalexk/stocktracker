const puppeteer = require('puppeteer');

const url =
  'https://clients.mindbodyonline.com/asp/adm/adm_appt_search.asp?studioid=253992&tab';

function formattedDate(d = new Date()) {
  return [d.getDate() + 14, d.getMonth() + 1, d.getFullYear()]
    .map((n) => (n < 10 ? `0${n}` : `${n}`))
    .join('/');
}

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-gpu'],
    });
    const page = await browser.newPage();

    page.on('error', (e) => console.log(e));

    await page.goto(url);
    await page.waitForTimeout(2000);
    await page.click("input[id='btnSignIn']", { delay: 20 });
    await page.waitForTimeout(2000);
    await page.type("input[id='su1UserName']", 'ameshalexusa@gmail.com', {
      delay: 20,
    });
    await page.waitForTimeout(2000);

    await page.type("input[id='su1Password']", 'Water@123', {
      delay: 20,
    });
    await page.waitForTimeout(2000);
    await page.click("input[id='btnSu1Login']", { delay: 20 });
    await page.waitForTimeout(2000);
    await page.click("a[id='tabA9']", { delay: 20 });
    await page.waitForTimeout(2000);
    await page.click("input[id='txtDate']", { delay: 20 });
    await page.waitForTimeout(2000);
    const inputValue = await page.$eval('#txtDate', (el) => el.value);
    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }
    await page.waitForTimeout(2000);
    await page.type("input[id='txtDate']", formattedDate(), { delay: 20 });
    await page.waitForTimeout(2000);
    await page.keyboard.press('Enter');

    await page.waitForTimeout(2000);

    const trCheck = await page.evaluate(() =>
      Array.from(document.querySelectorAll('tr'), (e) => e)
    );

    await console.log(trCheck, 1);

    const selectedTrCheck = await trCheck.filter((x, idx) => {
      if (idx === 39) {
        return x;
      }
    });

    await console.log(selectedTrCheck, 2);

    let selectedTdCheck = await selectedTrCheck.filter((x, idx) => {
      if (
        idx === 1 ||
        idx === 3 ||
        idx === 5 ||
        idx === 7 ||
        idx === 9 ||
        idx === 11
      ) {
        return x;
      }
    });
    await console.log(selectedTdCheck, 3);

    let selectedChildren = await Array.from(selectedTdCheck[0]);

    await console.log(selectedChildren, 4);

    // let selectedChildrenArray = await Array.from(selectedChildren);

    await console.log(selectedChildrenArray, 5);

    let availableSlots = await selectedChildrenArray.filter((x) => {
      if (x.className.includes('avail')) {
        return x;
      }
    });
    await console.log(availableSlots, 6);

    // const d = c.filter((x) => {
    //   console.log(x.children[0]);
    // });

    // const sevenPmSlot = await page.$$eval('tr', (el) =>
    //   el.filter((x, idx) => {
    //     if (idx === 20) {
    //       return x;
    //     }
    //   })
    // );

    // await console.log(sevenPmSlot);

    // const convertedSevenPmSlot = await Array.prototype.slice.call(sevenPmSlot);
    // await console.log(convertedSevenPmSlot);
    // const value = await page.evaluate(() => {
    //   innerValue = document.querySelectorAll('.avail').children[0];

    //   return innerValue;
    // });

    // await console.log(value);

    // await page.click("input[class='find-an-appt-bttn simpleButton']", {
    //   delay: 20,
    // });

    // let linkTexts = await page.$$eval('td', (elements) =>
    //   elements.map((item) => {
    //     return item;
    //   })
    // );
    // // prints a array of text
    // await console.log(linkTexts);

    // let bob = document.querySelectorAll('tr');

    // let tom = bob[25];

    // for (let i of tom) {
    //   if (i.children[0].classList[0] === 'apptLink') {
    //     console.log(i.children[0].classList[0]);
    //   }
    // }

    // let linkTexts = await page.$$eval('.apptLink', (elements) =>
    //   elements.map((item) => {
    //     if (item.href.includes('Stime=8:30:00%20AM')) {
    //       return item.href;
    //     }
    //   })
    // );
    // // prints a array of text
    // await console.log(linkTexts);

    // const elHandleArray = await page.$$eval('apptLink');

    // elHandleArray.map(async (el) => {
    //   await console.log(el);
    // });

    // await page.evaluate(() => {
    //   await let elements = document.getElementsByClassName('apptLink');
    //   if (elements) {
    //     for (let element of elements) {
    //        console.log(element);
    //     }
    //   } else {
    //      console.log('no results');
    //   }
    // });
    // const nodeChildren = await page.$eval(
    //   "a[class='apptLink mainTextSmall2']",
    //   (uiElement) => {
    //     for (i of uiElement) {
    //       return i;
    //     }
    //   }
    // );
    // console.log(nodeChildren);
    // console.log(nodeChildren[0]);
    // await browser.close();
  } catch (e) {
    console.log(e);
  }
})();
