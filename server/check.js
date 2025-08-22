import puppeteer from "puppeteer";

const run = async () => {
  const browser = await puppeteer.launch();
  const version = await browser.version();
  console.log("Chromium version:", version);
  await browser.close();
};

run();
