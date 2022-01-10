const puppeteer = require("puppeteer");
(async () => {
  const input = {
    username: "andrewcbld@hotmail.com",
    password: "Environment10-==",
  };
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.facebook.com");

  // Login
  await page.type("#email", input.username);
  await page.type("#pass", input.password);
  await page.click(`button[name="login"]`);
  await page.waitForNavigation();

  // Get cookies
  const cookies = await page.cookies();

  console.log(cookies);
  // Use cookies in another tab or browser
  const page2 = await browser.newPage();
  await page2.setCookie(...cookies);
  // example: get innerHTML of an element

  await page.goto("https://www.facebook.com/adpreferences/ad_settings");
  //div[role="main"] > div > div > div > div > div

  const selector = `div[role="main"] > div > div > div > div > div > div:nth-child(3) > [data-visualcompletion="ignore-dynamic"] > div`;

  // const someContent = await page.$eval(
  //   selector,
  //   (el) => el.innerHTML
  // );
  // console.log(someContent);

  // const regex = /Data about your activity from partners/;

  // console.log(someContent.search(regex));
  await page.click(selector);
  // Use Promise.all to wait for two actions (navigation and click)
  // await Promise.all([
  //   page.waitForNavigation(), // wait for navigation to happen
  //   page.click(`a[href^="/us/shop/goto/store"]`), // click link to cause navigation
  // ]);

  // another example, this time using the evaluate function to return innerText of body
  // const moreContent = await page.evaluate(() => document.body.innerText);
  // console.log(moreContent);
  // click another button
  // await page.click("#button");

  // close brower when we are done
  await browser.close();
})();
