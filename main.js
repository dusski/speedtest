// @ts-check

const 
    puppeteer = require('puppeteer');

(async () => {

    const SERVER_LOCATION = "#container > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div.result-area.result-area-connection > div > div.pure-u-5-12.u-c.result-item-container-align-left > div > div > div:nth-child(3) > span"
    const INPUT_LOCATION = "Tokyo"

    const browser = await puppeteer.launch({slowMo: 100, headless: false});

    const page = await browser.newPage();
    await page.goto('https://beta.speedtest.net');

    // await page.waitForSelector(SERVER_LOCATION, {visible: true});

    const serverLocation = await page.$eval(SERVER_LOCATION, el => el.textContent);

    if(serverLocation == INPUT_LOCATION) {
        // if server is what we look for
    }

})()