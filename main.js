// @ts-check

const puppeteer = require("puppeteer"),
	ncp = require("copy-paste");

(async () => {
	const INPUT_LOCATION = "Tokyo";

	const browser = await puppeteer.launch({ slowMo: 100 });
	const page = await browser.newPage();
	console.log("Browser launched...");

	await page.goto("https://beta.speedtest.net");
	console.log("Page opened...");

	const DEFAULT_SERVER_LOCATION =
		"#container > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div.result-area.result-area-connection > div > div.pure-u-5-12.u-c.result-item-container-align-left > div > div > div:nth-child(3) > span";
	await page.waitForSelector(DEFAULT_SERVER_LOCATION);
	const location = await page.$eval(
		DEFAULT_SERVER_LOCATION,
		el => el.textContent
	);

	console.log("Checking server...");
	if (location != INPUT_LOCATION) {
		console.log("Different server found. Changing server...");
		const BTN_CHANGE_SERVER =
			"#container > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div.result-area.result-area-connection > div > div.pure-u-5-12.u-c.result-item-container-align-left > div > div > div:nth-child(4) > a";
		await page.click(BTN_CHANGE_SERVER);

		const SERVER_SEARCHBOX = "#host-search";
		await page.waitForSelector(SERVER_SEARCHBOX);
		await page.focus(SERVER_SEARCHBOX);
		await page.type(SERVER_SEARCHBOX, INPUT_LOCATION, { delay: 50 });

		const SERVER_RESULT =
			"#find-servers > div > div.pure-u-3-5.u-c.server-hosts-col > div > div > ul > li:nth-child(2) > a > span.host-location";
		page.click(SERVER_RESULT);
		console.log("Server changed...");
	}

	const BTN_START_SPEEDTEST =
		"#container > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.start-button > a > span.start-text";
	await page.click(BTN_START_SPEEDTEST);
	console.log("Speedtest started...");

	const BTN_SHARE_LINK =
		"#container > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div.result-area.result-area-test > div > div.result-container.clearfix > div.result-container-meta > div > div.result-item.result-item-share > div.result-data.result-data-small.eot-social-wrapper > div > div > div.icon-wrapper > a:nth-child(1)";

	await page.waitForSelector(BTN_SHARE_LINK, { timeout: 60000 });
	const shareLink = await page.$eval(BTN_SHARE_LINK, el => el["href"]);
	console.log(`Speedtest finished: ${shareLink}`);

	ncp.copy(shareLink);

	await browser.close();
})();
